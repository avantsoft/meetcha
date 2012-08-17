Ext.define('Meetcha.view.MeetupCommentsPanel', {
    extend: 'Ext.Container',
    alias: 'widget.meetupcommentspanel',
    requires: ['Meetcha.view.CommentForm'],
    config: {
        flex: 1,
        meetupId: '',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'commentform',
            height: 120
        }]
    },
    /**
     * Load the comments into this panel.
     */
    loadComments: function() {
        var me            = this,
            commentsStore = Ext.create('Meetcha.store.MeetupCommentStore'),
            meetupId      = me.getMeetupId(),
            commentsUrl   = commentsStore.getCommentsURL();

        commentsStore.getProxy().setUrl(commentsUrl + meetupId);
        commentsStore.load({
            callback: function() {
                me.add({
                    xtype: 'meetupcommentlist',
                    flex: 1,
                    store: commentsStore
                });
            }
        });

    }
});
