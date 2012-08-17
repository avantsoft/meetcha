// this class expects id, store config options
Ext.define('Meetcha.view.NextMeetup', {
    requires: ['Meetcha.view.Map'],
    extend: 'Ext.Container',
    alias: 'widget.nextmeetup',
    config: {
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        checkedIn: false,
        store: undefined
    },

    initialize: function(config) {
        var me        = this,
            checkedIn = me.getCheckedIn(),
            map       = Ext.create('Meetcha.view.Map', {
                padding: 10,
                flex: 1
            });

        me.add(map);
        me.add({
            dock: 'bottom',
            xtype: 'toolbar',
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'center'
            },
            padding: '0 0 10 0',
            items: [{
                xtype: 'button',
                centered: 'true',
                text: 'At Meetup',
                handler: function() {
                    if (!me.getCheckedIn()) {
                        me.fireEvent('atmeetup', me.getRecord());
                    }
                }
            }]
        });

    },
    updateCheckin: function() {
        this.setCheckedIn(true);
        this.setButtonState();
    }
});
