Ext.define('Meetcha.view.CustomOverlay', {
    extend: 'Ext.Panel',
    alias: 'widget.customoverlay',
    showCancel: true,
    zIndex: 15,
    config: {
        fullscreen: true,
        hideOnMaskTap: false,
        border: false,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        listeners: {
            destroy: function() {
                Ext.getCmp('meetchatitlebar').show();
            }
        }
    },

    initialize: function() {
        var me = this,
            tbItems, toolbar, form;
        me.callParent();

        toolbar = me.add({
            xtype: 'toolbar',
            docked: 'top',
            height: 40,
            itemId: 'topToolbar',
            title: me.title ? {
                title: Ext.util.Format.ellipsis(me.title, 20)
            } : null,
            items: me.showCancel ? {
                itemId: 'cancelBtn',
                text: 'Back',
                ui: 'back',
                handler: function() {
                    me.destroy();
                }
            } : null
        });

        var form = me.down('formpanel');
        if (form) {
            form.add({
                xtype: 'button',
                itemId: 'bottomCloseButton',
                text: me.buttonLabel || 'Close',
                action: 'close',
                width: '90%',
                margin: '30 5%',
                handler: (me.buttonHandler ||
                function() {
                    me.closeCallback();
                    me.destroy();
                })
            });
        }
    },

    /*
     * Set the title of this custom overlay
     */
    setTitle: function(title) {
        var topToolbar = this.down('#topToolbar');
        topToolbar.setTitle(title);
    },
    /*
     * Change the button handler to a custom function
     */
    setButtonHandler: function(newHandler) {
        var bottomButton = this.getBottomButton();
        bottomButton.setHandler(newHandler);
    },
    /*
     * Change the button label to a custom label
     */
    setButtonLabel: function(label) {
        var bottomButton = this.getBottomButton();
        bottomButton.setText(label);
    },
    getBottomButton: function() {
        return this.down('#bottomCloseButton');
    },

    closeCallback: function() {}

});
