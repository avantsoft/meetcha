Ext.define('Meetcha.controller.AtMeetup', {
    extend: 'Meetcha.controller.CommonInteractions',
    requires: ['Meetcha.classes.SharedTemplates','Meetcha.store.RsvpMemberStore'],
    config: {
        refs: {
            'atMeetup': 'atmeetup',
            'nextMeetup': 'nextmeetup'
        },
        control: {
            'meetupsummary': {
                'details': 'onDetailsClick',
                'joinDirectRsvp': 'onRsvpClick',
                'cancel': 'onCancelClick',
                'going': 'onMembersClick',
                'comments': 'onCommentsClick',
                'checkIn': 'onCheckIn'
            },
            'nextMeetup': {
                'atmeetup': 'onAtMeetupClick'
            }
        },
        views: ['CommentForm', 'MeetupCommentList', 'MeetupCommentsPanel'],
        memberStore: Ext.create('Meetcha.store.RsvpMemberStore')
    },
    /*
     * Checkin
     */
    onCheckIn: function(record) {
        var me      = this,
            rsvpURL = serverUrl + 'php/submit_checkin.php';

        Ext.data.JsonP.request({
            url: rsvpURL,
            params: {
                event_id: record.get('id')
            },
            success: function(result, request) {
                me.getAtMeetup().updateCheckin();
            },

            failure: function(result, request) {
                console.log('comm fail', result);
                Ext.Msg.alert('Failed', 'Communication Failure', Ext.emptyFn);
            }

        });
    },
    /*
     * Manually update the current record's rsvp.
     */
    updateRsvp: function(status) {
        var newRecord = this.getAtMeetup().getRecord();

        if (status === "no") {
            newRecord.set('self', {});
        } else {
            newRecord.set('self', {
                "checked_in": false,
                "rsvp": {
                    "response": "yes"
                },
                "actions": ["edit", "rsvp"]
            });
        }


    },
    /*
     * Show at meetup screen
     */
    onAtMeetupClick: function(record) {
        var checkedIn  = record.get('self') && record.get('self').checked_in,
            app        = this.getApplication(), 
            homeScreen = app.getController('HomeScreen'),
            panel      = Ext.create('Meetcha.view.AtMeetup', {
                summaryTpl: Meetcha.classes.SharedTemplates.meetupSummary,
                record: record,
                store: this.getNextMeetup().getStore(),
                checkedIn: checkedIn
            });
            
        Ext.Viewport.removeAll();
        Ext.Viewport.add(panel).show();

        homeScreen.setLastActiveItem(panel);
        homeScreen.setLastListType('meetups');
        app.getController('MeetchaTitleBar').enableLandingState('At Meetup');
    },

    onRsvpClick: function(record) {
        this.rsvp(record.get('id'), record.get('name'), 'yes');
    }
});
