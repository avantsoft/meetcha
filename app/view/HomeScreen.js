Ext.define('Meetcha.view.HomeScreen', {
    extend: 'Ext.Container',
    xtype: 'homescreen',
    config: {
        xtype: 'container',
        cls: 'button-container',
        defaults: {
            iconAlign: 'top',
            margin: 10,
            top: 0,
            left: 0
        },
        items: [{
            xtype: 'button',
            cls: 'home-button findmeetups',
            pleft: 18,
            ptop: 40,
            ltop: 0,
            lleft: 48,
            iconCls: 'find-meetups',
            text: 'Find Meetups',
            action: 'findmeetups'
        }, {
            xtype: 'button',
            cls: 'home-button mymeetups',
            ptop: 86,
            pleft: 160,
            ltop: 10,
            lleft: 210,
            iconCls: 'my-meetups',
            text: 'My Meetups',
            action: 'mymeetups'
        }, {
            xtype: 'button',
            cls: 'home-button findgroups',
            ptop: 180,
            pleft: 20,
            ltop: 120,
            lleft: 120,
            iconCls: 'find-groups',
            text: 'Find Groups',
            action: 'findgroups'
        }, {
            xtype: 'button',
            cls: 'home-button mygroups',
            ptop: 225,
            pleft: 132,
            ltop: 120,
            lleft: 262,
            iconCls: 'my-groups',
            text: 'My Groups',
            action: 'mygroups'
        }, {
            xtype: 'button',
            itemId: 'infoButton',
            action: 'info',
            hidden: false,
            iconMask: true,
            docked: 'bottom',
            iconCls: 'info',
            ui: 'plain',
            ptop: 370,
            pleft: 0,
            ltop: 210,
            lleft: 0,
            margin: 0
        }]
    },

    initialize: function() {
        this.on('painted', this.doOrientation, this);
        Ext.Viewport.on('orientationchange', this.doOrientation, this);

        this.callParent();
    },

    orientationCls: ['home-portrait', 'home-landscape'],

    doOrientation: function() {
        var me = this,
            orientation = Ext.Viewport.getOrientation(),
            letter = orientation.charAt(0),
            items = this.getItems().getRange(),
            i = 0,
            ln = items.length,
            item, el, top, left;

        me.element.removeCls(me.orientationCls);
        me.element.addCls('home-' + orientation);
        for (; i < ln; i++) {
            item = items[i];
            top = item.initialConfig[letter + 'top'];
            left = item.initialConfig[letter + 'left'];
            el = item.element;
            if (el) {
                el.setBox({
                    top: top,
                    left: left
                });
            }
        }
    }
});
