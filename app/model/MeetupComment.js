Ext.define('Meetcha.model.MeetupComment', {
	extend: 'Ext.data.Model',
	config: {
		idProperty: 'event_comment_id',
		fields: [{
			name: 'event_comment_id',
			type: 'string'
		}, {
			name: 'event_id',
			type: 'string'
		}, {
			name: 'member_id',
			type: 'string'
		}, {
			name: 'member_name',
			type: 'string'
		}, {
			name: 'member_photo'
		}, {
			name: 'comment',
			type: 'string'
		}, {
			name: 'time',
			type: 'date',
			convert: function(meetupCommentTime) {
				return new Date(meetupCommentTime);
			}
		}]
	}
});
