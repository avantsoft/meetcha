Ext.define('Meetcha.controller.CommonInteractions', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.plugin.ListPaging'],
    config: {
        memberStore: undefined,
        refs: {
            'meetchaTitleBar': 'meetchatitlebar'
        },
        stores: ['GroupMemberStore', 'RsvpMemberStore'],
        views: ['MeetupList', 'CustomOverlay', 'CommentForm', 'MeetupCommentsPanel', 'MeetupCommentList', 'AtMeetup', 'MeetupSummary', 'MemberList']
    },
    /*
     * Handles a user clicking on the details link of a MeetupList
     */
    onDetailsClick: function(record) {
        this.overlayClick({
            xtype: 'container',
            scrollable: {
                direction: 'vertical'
            },
            cls: 'meeting-details',
            flex: 1,
            html: record.get('description')
        }, record.get('name'));
    },
    /**
     * Handles a user clicking to see the members of a meetup.
     *
     *@param {Meetcha.model.Meetup} record The meetup of which to view members.
     */
    onMembersClick: function(record) {
        var memberStore = Ext.getStore(this.getMemberStore()),
            meetupId    = record.get('id'),
            memberUrl   = memberStore.getMembersURL(),
            oldUrl      = memberStore.getProxy().getUrl(), 
            newUrl      = memberUrl + meetupId,
            title       = record.get('name') + ' Members';

        if (oldUrl != newUrl) {
            memberStore.removeAll();
            memberStore.loaded = false;
            memberStore.getProxy().setUrl(memberUrl + meetupId);
            memberStore.load();
        }

        var membersPanel = Ext.create('Meetcha.view.MemberList', {
            meetupId: record.get('id'),
            store: memberStore
        });

        this.overlayClick(membersPanel, title);
    },
    /**
     * Common functionality of popping up an overlay based on a meetup record
     *@private
     */
    overlayClick: function(itemToAdd, title) {
        var popup = Ext.create('Meetcha.view.CustomOverlay', {
            title: title
        });

        popup.add(itemToAdd);
        this.getMeetchaTitleBar().hide();
        popup.show();
    },
    /**
     * Handles a user clicking on the comments link of a MeetupList
     *
     *@param {Meetcha.model.Meetup} record The meetup of which to view comments.
     */
    onCommentsClick: function(record) {
        var title         = record.get('name') + ' Comments',
            commentsPanel = Ext.create('Meetcha.view.MeetupCommentsPanel', {
                meetupId: record.get('id')
            });

        this.overlayClick(commentsPanel, title);
        commentsPanel.loadComments();
    },
    /*
     * Cancel your rsvp to the meetup record.
     */
    onCancelClick: function(record) {
        var me = this;
        Ext.data.JsonP.request({
            url: serverUrl + 'php/submit_rsvp.php',
            method: 'GET',
            params: {
                'event_id': record.get('id'),
                'rsvp': 'no'
            },
            success: function(result, request) {
                me.reloadActiveStore();
                if (me.updateRsvp) {
                    me.updateRsvp('no');
                }
            }
        });
    },

    /*
     * Reloads the appropriate store based on the child implementation of this controller.
     */
    reloadActiveStore: function() {
        var listStore = this.getApplication().getController('HomeScreen').refreshActiveStore();
    },
    
    /*
     * RSVP for the meetup.
     */
    rsvp: function(event_id, event_name, rsvp) {
        var me      = this,
            rsvpURL = serverUrl + 'php/submit_rsvp.php';

        Ext.data.JsonP.request({
            url: rsvpURL,
            params: {
                event_id: event_id,
                rsvp: rsvp
            },
            success: function(result, request) {
                if (result.problem) {
                    if (result.details == 'payment is required to RSVP') {
                        Ext.Msg.alert('Payment Required', 'This meetup requires payment. <br/><br/> Please use Meetup.com directly to register and pay for this meetup.');
                    } else {
                        Ext.Msg.alert('Failed', result.details, Ext.emptyFn);
                    }
                } else {
                    me.reloadActiveStore();
                    if (me.updateRsvp) {
                        me.updateRsvp('yes');
                    }
                }
            },

            failure: function(result, request) {
                console.log('commfail', result);
                Ext.Msg.alert('Failed', 'Communication Failure', Ext.emptyFn);
            }
        });
    }
});
