Ext.define('Meetcha.view.MultiActionList' ,{
    extend : 'Ext.dataview.List',
    config : {
        scrollable : 'vertical',
        disableSelection: true,
        pressedCls : ''
    },
    initialize : function() {
        this.callParent(arguments);

        this.on(
            'tap',
            function(event, target) {
                var action  = target.getAttribute('action'),
                    id      = target.getAttribute('mu:id'),
                    record  = id && this.getStore().getById(id);

                this.fireEvent('actionTap', this, action, record, event, target);
            },
            this,
            {
                delegate: 'a[action]',
                element: 'innerElement'
            }
        );
    }
});