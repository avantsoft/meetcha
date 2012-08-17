//<debug>
Ext.Loader.setPath({
    'Ext': 'sdk/src',
    'Meetcha.util': 'app/classes'
});
Ext.Logger = Ext.create('Ext.log.Logger');
//</debug>

Ext.application({
    name: 'Meetcha',
	tabletStartupScreen: 'resources/images/meetcha_tablet_startup.png',
    phoneStartupScreen:  'resources/images/meetcha_phone_startup.png',
	icon : 'resources/images/meecha_icon.png',
    glossOnIcon: false,
	controllers: [
        'User',
        'Map',
        'CommonInteractions' ,
        'GroupList',
        'MeetupList',
        'Find',
        'HomeScreen',
        'MeetchaTitleBar',
        'Geolocation',
        'AtMeetup'
    ],
    views: [
        'HomeScreen',
        'MeetchaTitleBar'
    ],

    requires: ['Meetcha.util.Format', 'Ext.MessageBox', 'Ext.data.proxy.LocalStorage'],

    viewport: {
        autoMaximize: true
    },

    launch: function(){
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        Ext.Viewport.on('orientationchange', function() {
            // console.log('Orientation Change: ' + Ext.Viewport.getOrientation());
        }, this);

    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function() {
                window.location.reload();
            }
        );
    }
});


//window.onerror = function(error){
//    debugger;
//};