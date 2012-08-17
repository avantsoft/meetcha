Ext.define('Meetcha.store.GroupMemberStore', {
	extend: 'Ext.data.Store',
	requires: 'Meetcha.model.GroupMember',
	config: {
		model: 'Meetcha.model.GroupMember',
		membersURL: serverUrl + 'php/2_members.php?group_id=',
		deferEmptyText: true,
		proxy: {
			type: 'jsonp',
			url: this.membersURL,
			reader: {
				type: 'json',
				rootProperty: 'results',
				totalProperty: 'meta.total_count'
			}
		}
	}
});
