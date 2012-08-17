Ext.define('Meetcha.controller.User', {
    extend: 'Ext.app.Controller',
    config: {
        models: ['User'],
        currentUser: {
            id: -1
        },
        views: ['AtMeetup', 'HomeScreen', 'MeetchaTitleBar']
    },
    launch: function() {
        var me = this;
        Meetcha.model.User.load(1, {
            success: function(rec) {
                var id         = rec.get('id'),
                    app        = me.getApplication(), 
                    homeScreen = app.getController('HomeScreen');
                Ext.Viewport.add({
                    docked: 'top',
                    xtype: 'meetchatitlebar',
                    title: 'Meetcha'
                });
                if (id == -1) {
                    homeScreen.promptForLogin();
                } else {
                    me.setCurrentUser({
                        id: id
                    });
                    homeScreen.decideWhatToDo();
                    app.getController('Find').initializeSettings();
                }
            }
        });
    }
});
