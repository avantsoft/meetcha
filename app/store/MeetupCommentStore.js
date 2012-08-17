Ext.define('Meetcha.store.MeetupCommentStore', {
	extend: 'Ext.data.Store',
	alias: 'widget.meetupcommentstore',
	config: {
		model: 'Meetcha.model.MeetupComment',
		commentsURL: serverUrl + 'php/event_comments.php?&event_id=',
		proxy: {
			type: 'jsonp',
			url: this.commentsURL + '0',
			reader: {
				type: 'json',
				rootProperty: 'results',
				totalProperty: 'meta.total_count'
			}
		}
	}
});
