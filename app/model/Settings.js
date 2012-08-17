Ext.define('Meetcha.model.UserSettings', {
	extend: 'Ext.data.Model',
	config: {
		idProperty: 'id',
		fields: [
		// General settings
		{
			name: 'id',
			type: 'string'
		}, {
			name: 'username',
			type: 'string'
		}, {
			name: 'userpassword',
			type: 'string'
		}, {
			name: 'useGeoLoc',
			type: 'boolean'
		}],
		proxy: {
			type: 'localstorage',
			id: 'settingsId'
		}
	}
});
