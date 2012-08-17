Ext.define('Meetcha.controller.MeetupList', {
    extend: 'Meetcha.controller.CommonInteractions',
    requires: 'Meetcha.store.RsvpMemberStore',
    config: {
        refs: {
            'homeScreen': 'homescreen',
            'groupQuestions': 'joingroupquestionspanel',
            'commentForm': 'commentform',
            'meetchaTitleBar': 'meetchatitlebar'
        },
        control: {
            'meetuplist': {
                actionTap: 'onActionTap'
            },
            'groupQuestions': {
                questionsAnswered: 'onQuestionsAnswered',
                questionsClosed: 'onQuestionsClosed'
            },
            'commentform button[addComment]': {
                tap: 'onAddComment'
            }
        },
        stores: ['MeetupCommentStore', 'MeetupBase', 'MeetupStore', 'MyMeetupStore', 'RsvpMemberStore'],
        models: ['MeetupComment', 'Meetup', 'RsvpMember'],
        views: ['CommentForm', 'MeetupCommentList', 'MeetupCommentsPanel', 'JoinGroupQuestionsPanel'],
        memberStore: 'RsvpMemberStore'
    },
    onActionTap: function(list, action, record, event, target) {
        switch (action) {
            case 'join':
                this.promptForJoinAndRsvp(record);
                break;
            case 'attend':
                this.rsvp(record);
                break;
            case 'details':
                this.onDetailsClick(record);
                break;
            case 'comments':
                this.onCommentsClick(record);
                break;
            case 'going':
                this.onMembersClick(record);
                break;
            case 'cancel':
                this.onCancelClick(record);
                break;
            case 'joinDirectRsvp':
                this.directRsvp(record);
                break;
        }
    },
    promptForJoinAndRsvp: function(record) {
        Ext.Msg.confirm('Join Group and RSVP', 'Please click yes to join the group and RSVP.', function(buttonId) {
            if (buttonId == 'yes') {
                this.checkForGroupQuestions(record);
            }
        }, this);
    },
    /*
     * Some meetups require the user to answer questions before joining the group.
     */
    checkForGroupQuestions: function(record) {
        var me = this;
        Ext.data.JsonP.request({
            url: serverUrl + 'php/2_groups_by_group_id.php',
            method: 'GET',
            params: {
                group_id: record.get('group').id
            },
            success: function(result, request) {
                var eventId   = record.get('id'),
                    eventName = record.get('name'),
                    results   = result.results[0];

                if (results.join_info.questions_req == '1' && results.join_info.questions) {
                    me.getMeetchaTitleBar().hide();
                    Ext.Viewport.add({
                        xtype: 'joingroupquestionspanel',
                        event_id: eventId,
                        event_name: eventName,
                        group: results
                    }).show();
                } else {
                    this.joinAndRsvp(eventId, eventName, results);
                }
            },
            scope: this,
            record: record
        });
    },
    /*
     * Submit the user's answers to the questions.
     */
    onQuestionsAnswered: function(group, eventId, eventName) {
        var me = this;
        me.joinAndRsvp(eventId, eventName, group);
        me.onQuestionsClosed();
    },
    onQuestionsClosed: function() {
        Ext.Viewport.remove(this.getGroupQuestions());
        this.getApplication().getController('HomeScreen').showHomeScreen();
    },
    /*
     * Join and RSVP a particular meetup.
     */
    joinAndRsvp: function(eventId, eventName, group) {
        var me       = this,
            answers  = '',
            joinInfo = group.join_info;

        if (joinInfo.questions_req == '1' && joinInfo.questions) {
            var questions = joinInfo.questions,
                i = 0, q;
            for (i; i < questions.length; i++) {
                q = questions[i];
                answers += '&answer_' + q.id + '=' + q.answer;
            }
        }

        var profileURL = serverUrl + 'php/2_profile.php?group_urlname=' + group.urlname + '&group_id=' + group.id + answers;

        // join the group
        Ext.data.JsonP.request({
            url: profileURL,
            method: 'GET',
            success: function(result, request) {
                if (result.status == 'active') {
                    // echo "You have succesfully joined the group";
                    Ext.Msg.alert('Join Status', 'You have successfully joined the group.', Ext.emptyFn);
                    // RSVP yes to the given event
                    me.rsvp(eventId, eventName, 'yes');
                } else if (result.status == 'pending') {
                    Ext.Msg.alert('Join Status', 'You are on the waiting list for this group.', Ext.emptyFn);
                    me.reloadActiveStore();
                } else {
                    Ext.Msg.alert('Failed to Join', response.details, Ext.emptyFn);
                }
            },
            scope: this
        });
    },
    /*
     * Invoked when you do not need to join the group.
     */
    directRsvp: function(record) {
        this.rsvp(record.get('id'), record.get('name'), 'yes');
    },

    onAddComment: function() {
        var me = this;
        Ext.data.JsonP.request({
            url: serverUrl + 'php/2_event_comment.php',
            method: 'POST',
            params: {
                event_id: me.meetupId,
                comment: me.parent.getComponent('comment').getValue()
            },
            success: function(result, request) {
                if (result.code == 'nonmember') {
                    Ext.Msg.alert('Attention!!', 'You cannot add comments as you are not a member of this group.')
                } else {
                    me.getCommentForm().setValue('');
                    me.load();
                }
            },
            failure: function(result, request) {
                console.log('Error ' + result);
                Ext.Msg.alert('Error ' + result);
            }
        });
    }
});
