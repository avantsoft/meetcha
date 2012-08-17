Ext.define('Meetcha.controller.Map', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['Meetcha.view.Map'],
        refs: {
            'map': 'meetup-map'
        }
    },
    /**
     * Handles a user clicking on the map button.
     */
    onMapButtonClick: function() {
        var me             = this,
            app            = me.getApplication(),
            storeWithItems = app.getController('HomeScreen').getLastActiveListStore(),
            listType       = app.getController('HomeScreen').getLastListType();

        if (!me.getMap()) {
            Ext.Viewport.add({
                xtype: 'meetup-map'
            });
        }

        me.initMap(storeWithItems.getRange(), listType);
        me.focusMap();
    },
    initMap: function(records, listType) {
        var tpl = ['{name}<br/>', '<tpl if="photo_url != null">', '<img src="{photo_url}"/>', '</tpl>'],
            map = this.getMap();

        Ext.Array.insert(tpl, 1, listType == 'meetups' ? '{yes_rsvp_count} attending.<br/>' : '{members} members.<br/>');

        map.setMarkerTemplate(tpl.join(''));
        map.clearMarkers();
        map.addMarkers(records);
    },
    /*
     * Shows the map
     */
    focusMap: function() {
        Ext.Viewport.setActiveItem(this.getMap());
    }
});
