Ext.define('Meetcha.store.MyGroupStore', {
	extend: 'Meetcha.store.MeetupBase',
	config: {
		model: 'Meetcha.model.Group',
		proxy: {
			type: 'jsonp',
			url: serverUrl + 'php/2_groups.php',
			reader: {
				type: 'json',
				rootProperty: 'results',
				totalProperty: 'meta.total_count'
			}
		}
	}
});
