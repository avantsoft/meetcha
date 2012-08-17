Ext.define('Meetcha.store.MyMeetupStore', {
	extend: 'Meetcha.store.MeetupBase',
    config: {
	    model: 'Meetcha.model.Meetup',
	    proxy: {
	        type: 'jsonp',
	        url: serverUrl + 'php/2_events.php',
	        reader: {
	        	type: 'json',
	        	rootProperty: 'results',
	        	totalProperty: 'meta.total_count'
	        }
	    }
	}
});
