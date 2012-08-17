Ext.define('Meetcha.store.MeetupBase', {
    extend: 'Ext.data.Store',
    config: {
        autoLoad: false
    },
    updateFromSettings: function(findSetting, cords, clearFirst) {
        var me = this,
            data = findSetting.data,
            proxy = me.getProxy(),
            p;

        if (cords !== undefined) {
            data['lat'] = cords['lat'];
            data['lon'] = cords['lon'];
        }

        if (clearFirst === true) {
            me.removeAll();
        }


        for (p in data) {
            proxy.setExtraParam(p, data[p]);
        }

        me.load();

    }
});
