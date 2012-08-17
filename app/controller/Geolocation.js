/**
 * Responsible for keeping track of the currently detected geolocation,
 * or lack thereof.
 */
Ext.define('Meetcha.controller.Geolocation', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.util.Geolocation'],
    config: {
        geolocationIsSupported: false,
        geoMonitor: undefined,
        cords: undefined
    },
    launch: function() {
        var me = this;
        if (Ext.feature.has.Geolocation) {
            var geo = Ext.create('Ext.util.Geolocation', {
                autoUpdate: true,
                listeners: {
                    locationupdate: function(geo) {
                        me.setCords({
                            'lat': geo.getLatitude(),
                            'lon': geo.getLongitude()
                        });

                        //Only indicate full support when we have received at least one location.
                        me.setGeolocationIsSupported(true);
                    },
                    locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
                        if (me.getCords() === undefined) {
                            me.setGeolocationIsSupported(false);
                        }
                    }
                }
            });

            me.setGeoMonitor(geo);
            me.setGeolocationIsSupported(true);
        } else {
            me.setGeolocationIsSupported(false);
        }
    }
});
