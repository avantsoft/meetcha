Ext.define('Meetcha.model.FindSettings', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'id',
        fields: [{
            name: 'Location',
            type: 'boolean'
        }, {
            name: 'ZipCode',
            type: 'string'
        }, {
            name: 'Distance',
            type: 'string'
        }, {
            name: 'Time',
            type: 'string'
        }, {
            name: 'Interests',
            type: 'string'
        }],
        proxy: {
            type: 'localstorage',
            id: 'findSettingsId'
        }
    }
});
