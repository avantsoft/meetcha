Ext.define('Meetcha.store.RsvpMemberStore', {
	extend: 'Ext.data.Store',
	requires: ['Meetcha.model.RsvpMember'],
	config: {
		storeId: 'RsvpMemberStore',
		model: 'Meetcha.model.RsvpMember',
		membersURL: serverUrl + 'php/2_rsvps.php?event_id=',
		proxy: {
			type: 'jsonp',
			url: this.membersURL + '0',
			reader: {
				type: 'json',
				rootProperty: 'results',
				totalProperty: 'meta.total_count'
			}
		}
	}
});
