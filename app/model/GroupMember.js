Ext.define('Meetcha.model.GroupMember', {
	extend: 'Ext.data.Model',
	config: {
		idProperty: 'id',
		fields: [{
			name: 'id',
			type: 'string'
		}, {
			name: 'member_name',
			mapping: 'name',
			type: 'string'
		}, {
			name: 'bio',
			type: 'string'
		}, {
			name: 'city',
			type: 'string'
		}, {
			name: 'photo'
		}, {
			name: 'joined',
			type: 'date',
			convert: function(joinedTime) {
				return new Date(joinedTime);
			}
		}]
	}
});
