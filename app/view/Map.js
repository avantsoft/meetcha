Ext.define('Meetcha.view.Map', {
    extend: 'Ext.Map',
    alias: 'widget.meetup-map',
    config: {
        maskMap: true,
        mapOptions: {
            disableDefaultUI: false,
            zoom: 12,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL
            }
        },
        bounds: null,
        markerTemplate: "<div>{name}</div>"
    },
    listOfMarkers: [],
    /**
     * Remove all markers from the underlying google map.
     */
    clearMarkers: function() {
        var me  = this,
            len = me.listOfMarkers.length;
        for (var i = 0; i < len; i++) {
            me.listOfMarkers[i].setMap(null);
        };
        me.listOfMarkers = [];
    },
    /**
     * Add markers to the google map, inferring the correct lat/lon properties to use from the
     * provided records.
     */
    addMarkers: function(records) {
        var me             = this,
            map            = this.getMap(),
            templateMarkup = this.getMarkerTemplate(),
            template       = new Ext.XTemplate(templateMarkup),
            renderedHtml, venue;

        me.bounds = new google.maps.LatLngBounds();

        records.forEach(function(record) {
            renderedHtml = template.apply(record.data);
            venue = record.get('venue');
            if (venue) {
                me.placeItemMarker(venue.lat, venue.lon, renderedHtml);
            } else {
                me.placeItemMarker(record.get('lat'), record.get('lon'), renderedHtml);
            }
        });

        if (records.length > 0) {
            Ext.Function.defer(function() {
                map.fitBounds(me.bounds);
                /*
                 * Set a deafult zoom of twelve if this is only one item.
                 */
                if (records.length === 1) {
                    var listener = google.maps.event.addListener(map, 'bounds_changed', function() {
                        map.setZoom(12);
                        google.maps.event.removeListener(listener);
                    });
                }
            }, 10);
        };
    },
    /*
     * Put the item marker on the map.
     */
    placeItemMarker: function(lat, lon, markerHtml) {
        var me = this;
        if (!lat) {
            return;
        }
        var GrpLatLon = new google.maps.LatLng(lat, lon);

        try {
            var marker = new google.maps.Marker({
                position: GrpLatLon,
                map: me.getMap()
            });

            google.maps.event.addListener(marker, 'click', function() {
                var infoWindow = new google.maps.InfoWindow({
                    content: markerHtml
                });
                infoWindow.open(me.getMap(), marker);
            });

            me.listOfMarkers.push(marker);

            me.bounds.extend(GrpLatLon);

        } catch (err) {
            console.log("error at " + GrpLatLon + "  " + err);
        }
    }

});
