Ext.define('Meetcha.model.Meetup', {
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
			name: 'photo_url',
			type: 'string'
		}, {
			name: 'distance',
			type: 'string',
			convert: function(distanceInMiles) {
				if (distanceInMiles && Ext.isNumber(distanceInMiles)) {
					return distanceInMiles.toFixed(2);
				}
			}
		}, {
			name: 'time',
			type: 'date',
			convert: function(meetupTime) {
				return new Date(meetupTime);
			}
		}, {
			name: 'yes_rsvp_count',
			type: 'int'
		}, {
			name: 'group'
		}, {
			name: 'venue'
		}, {
			name: 'self'
		}]
	}
});
