Ext.define('Meetcha.model.Group', {
	extend: 'Ext.data.Model',
	config: {
		idProperty: 'id',
		fields: [{
			name: 'id',
			type: 'string'
		}, {
			name: 'name',
			type: 'string'
		}, {
			name: 'description',
			type: 'string'
		}, {
			name: 'group_urlname',
			type: 'string'
		}, // group_url field returned by GroupsStore -- https://api.meetup.com/groups
		{
			name: 'urlname',
			type: 'string'
		}, // group_url field returned by myGroupsStore -- https://api.meetup.com/2/groups
		{
			name: 'link',
			type: 'string'
		}, {
			name: 'members',
			type: 'int'
		}, {
			name: 'join_mode',
			type: 'string'
		}, // "open" or "closed"
		{
			name: 'lat',
			type: 'string'
		}, {
			name: 'lon',
			type: 'string'
		}, {
			name: 'photo_url',
			type: 'string'
		}, // photo field returned by GroupsStore -- https://api.meetup.com/groups
		{
			name: 'group_photo'
		}, // photo field returned by myGroupsStore -- https://api.meetup.com/2/groups
		{
			name: 'organizer_name',
			type: 'string'
		}, // organizer field returned by GroupsStore -- https://api.meetup.com/groups
		{
			name: 'organizer'
		}, // organizer field returned by myGroupsStore -- https://api.meetup.com/2/groups
		{
			name: 'marker'
		}, // on google map
		{
			name: 'is_member',
			type: 'int'
		} // 0=not_member 1=member
		]
	}
});
