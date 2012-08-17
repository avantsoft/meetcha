Ext.define('Meetcha.store.MeetupStore', {
    extend: 'Meetcha.store.MeetupBase',
    config: {
        model: 'Meetcha.model.Meetup',
        proxy: {
            type: 'jsonp',
            url: serverUrl + 'php/2_open_events.php',
            reader: {
                type: 'json',
                rootProperty: 'results',
                totalProperty: 'meta.total_count'
            }
        }
    }
});
