Ext.define('Meetcha.model.User', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'id',
        fields: [{
            name: 'id',
            type: 'string'
        }],
        proxy: {
            type: 'jsonp',
            url: serverUrl + 'php/user_check.php',
            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        }
    }
});
