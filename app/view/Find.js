Ext.define('Meetcha.view.Find', {
    extend: 'Ext.form.Panel',
    requires: ['Ext.field.Slider', 'Ext.field.Text', 'Ext.field.Checkbox', 'Ext.form.FieldSet', 'Ext.field.Toggle'],
    alias: 'widget.settingsfind',
    config: {
        geoEnabled: false,
        flex: 1,
        items: [{
            xtype: 'fieldset',
            defaults: {
                'labelWidth': '40%',
                'labelCls': 'setting-label'
            },
            items: [{
                xtype: 'togglefield',
                value: 1,
                name: 'Location',
                label: 'Use Current Location',
                itemId: 'useLocation',
                listeners: {
                    change: function() {
                        var setting = this.getValue(),
                            form = this.up('settingsfind'),
                            zip = form.down('zipcode');
                        if (setting == 1) {
                            zip.disable();
                        } else {
                            zip.enable();
                        }
                        form.fireEvent('changedSetting');
                    },
                    painted: function() {
                        var form = this.up('settingsfind');

                        if (form.getGeoEnabled()) {
                            this.enable();
                        } else {
                            //Make it clear that zipcode should be used.
                            this.disable();
                            this.setValue(0);
                            form.down('#zipcode').enable();
                        }
                    }
                }
            }, {
                xtype: 'textfield',
                name: 'ZipCode',
                itemId: 'zipcode',
                label: 'Zip Code',
                value: '94063',
                listeners: {
                    change: function() {
                        var form = this.up('settingsfind');
                        form.fireEvent('changedSetting', this.parent);
                    },
                    painted: function() {
                        var form = this.up('settingsfind');
                        if (form.down('#useLocation').getValue() == 1) {
                            this.disable();
                        } else {
                            this.enable();
                        }
                    }
                }
            }, {
                xtype: 'sliderfield',
                name: 'Distance',
                value: 25,
                minValue: 0,
                maxValue: 100,
                labelAlign: 'top',
                listeners: {
                    // I think this is a bug and incorrectly being pass params
                    // field, slider, thumb, newValue, oldValue
                    change: function(args) {
                        var newValue = args[1][2];
                        this.setLabel("Distance (" + newValue + " miles)");
                        var form = this.up('settingsfind');
                        form.fireEvent('changedSetting', form);
                    },
                    painted: function(field) {
                        this.setLabel("Distance (" + field.getValue() + " miles)");
                    }
                }
            }]
        }]
    },
    /*
     * Hopefully will be unnecessary soon.
     */
    getModelValuesFromForm: function() {
        var me = this,
            values = me.getValues();

        return {
            'Distance': values.Distance[0],
            'Time': values.Time ? values.Time[0] : null,
            'ZipCode': values.ZipCode,
            'Location': values.Location[0],
            'Interests': values.Interests ? values.Interests : null
        };
    },
});
