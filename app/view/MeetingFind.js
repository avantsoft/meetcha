Ext.define('Meetcha.view.MeetingFind', {
    extend : 'Meetcha.view.Find',
    initialize : function(){
        var fieldset = this.down('fieldset');
        fieldset.add(
            {
                xtype : 'textfield',
                name : 'Interests',
                label : 'Interests',
                value : 'Interests'
            }
        );
    }
});