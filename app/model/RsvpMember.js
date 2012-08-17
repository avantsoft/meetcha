Ext.define('Meetcha.model.RsvpMember', {
	extend: 'Ext.data.Model',
	config: {
		idProperty: 'rsvp_id',
		fields: [{
			name: 'rsvp_id',
			type: 'string'
		}, {
			name: 'member'
		}, {
			name: 'member_photo'
		}, {
			name: 'member_name',
			mapping: 'member.name'
		}]
	}
});
