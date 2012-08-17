Ext.define('Meetcha.view.MeetupList', {
    extend: 'Meetcha.view.MultiActionList',
    alias: 'widget.meetuplist',
    requires: 'Ext.plugin.PullRefresh',
    config: {
        emptyText: 'No Meetups found',
        cls: 'meetup-list',
        loadingText: 'Loading Meetups...',
        plugins: [{
            type: 'pullrefresh',
            pullRefreshText: 'Pull down to refresh meetups!'
        }, {
            type: 'listpaging',
            autoPaging: true,
            loadMoreText: ''
        }],
        itemTpl: Meetcha.classes.SharedTemplates.meetupSummary
    }
});
