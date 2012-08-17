Ext.define('Meetcha.controller.MeetchaTitleBar', {
    extend: 'Ext.app.Controller',
    config: {
        stores: ['Meetcha.store.MyMeetupStore'],
        refs: {
            'homeScreen': 'homescreen',
            'meetchaTitleBar': 'meetchatitlebar',
            'homeButton': 'meetchatitlebar button[action=home]',
            'listButton': 'meetchatitlebar button[action=list]',
            'mapButton': 'meetchatitlebar button[action=map]',
            'findButton': 'meetchatitlebar button[action=find]',
            'logoutButton': 'meetchatitlebar button[action=logout]',
            'atMeetupButton': 'meetchatitlebar button[action=atmeetup]'
        },
        control: {
            'homeButton': {
                tap: 'onHomeClick'
            },
            'listButton': {
                tap: 'onListClick'
            },
            'mapButton': {
                tap: 'onMapClick'
            },
            'findButton': {
                tap: 'onFindClick'
            },
            'logoutButton': {
                tap: 'onLogoutButtonClick'
            },
            'atMeetupButton': {
                tap: 'onAtMeetupButton'
            }
        }
    },
    /**
     * Handle the home button being clicked.
     */
    onHomeClick: function(loginSuccess) {
        var me = this;
        me.getApplication().getController('HomeScreen').showHomeScreen();
    },

    enableHomeView: function(loginSuccess) {
        var me = this;

        me.getMapButton().hide();
        me.getListButton().hide();
        me.getFindButton().hide();
        me.getHomeButton().hide();
        me.getAtMeetupButton().show();
        me.getLogoutButton().show();

        me.getMeetchaTitleBar().setTitle('Meetcha');
    },
    /*
     * Update the titlebar to show appropriately for list view
     */
    enableListView: function(title, loginSuccess) {
        var me = this;

        me.getMapButton().show();
        me.getFindButton().show();
        me.getHomeButton().show();
        me.getAtMeetupButton().hide();
        me.getLogoutButton().hide();

        me.getMeetchaTitleBar().setTitle(title);
    },

    enableLandingState: function(title) {
        var me = this;

        me.getMapButton().hide();
        me.getListButton().hide();
        me.getFindButton().hide();
        me.getHomeButton().show();
        me.getAtMeetupButton().hide();
        me.getLogoutButton().hide();

        me.getMeetchaTitleBar().setTitle(title);
    },
    /*
     * Handles the map button being clicked.
     */
    onMapClick: function() {
        var me = this;
        me.getMapButton().hide();
        me.getListButton().show();
        me.getApplication().getController('Map').onMapButtonClick();
    },
    /**
     * Handles the find button being clicked.
     */
    onFindClick: function() {
        var me = this;
        me.resetToListState();
        me.getApplication().getController('Find').onFindClick();
    },
    /*
     * Reset to list state.
     */
    onListClick: function() {
        this.resetToListState();
    },

    onLogoutButtonClick: function() {
        var me = this;
        me.getMeetchaTitleBar().hide();
        Ext.Viewport.removeAll();
        Ext.Viewport.add({
            fullscreen: true,
            xtype: 'panel',
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                title: 'Logout',
                items: [{
                    text: 'back',
                    ui: 'back',
                    handler: this.onHomeClick,
                    scope: this
                }]
            }, {
                padding: 15,
                html: 
                '<b>Leaving so soon?</b><br/><br/>' + 
                'To fully logout you must leave Meetcha and proceed directly to Meetup.com<br/><br/>' + 
                'After clicking below if you wish to continue using Meetcha please exit and relaunch the application<br/><br/>' + 
                '<a class="logout-link" id="logout-link-id">Logout</a>'
            }]
        }).show();
        Ext.get('logout-link-id').on('tap', function() {
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: 'Clearing Authentication & Logging Out'
            });
            Ext.data.JsonP.request({
                url: serverUrl + 'php/logout.php',
                success: function() {
                    Ext.getBody().createChild({
                        tag: 'iframe',
                        src: 'http://meetup.com/logout/',
                        height: '0%',
                        width: '0%'
                    });
                    Ext.Function.defer(function() {
                        window.location.reload();
                    }, 5000);
                }
            });
        });
    },
    resetToListState: function() {
        var me = this;
        me.getMapButton().show();
        me.getListButton().hide();
        me.getApplication().getController('HomeScreen').goBackToLastState();
    },
    /*
     * When the upcoming meetup button is pressed.
     */
    onAtMeetupButton: function() {
        this.getApplication().getController('HomeScreen').showNextMeetup();
    }
});
