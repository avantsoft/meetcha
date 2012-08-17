Ext.define('Meetcha.controller.HomeScreen', {
	extend: 'Ext.app.Controller',
    requires: ['Ext.DateExtras'],
	config: {
		refs: {
			'homeScreen': 'homescreen',
            'meetchaTitleBar': 'meetchatitlebar',
            'findButton' : 'meetchatitlebar button[action=find]',
            'findMeetupsBtn': 'homescreen button[action=findmeetups]',
            'myMeetupsBtn': 'homescreen button[action=mymeetups]',
            'findGroupsBtn': 'homescreen button[action=findgroups]',
            'myGroupsBtn': 'homescreen button[action=mygroups]',
            'infoBtn': 'homescreen button[action=info]'
		},
        views : [
            'Meetcha.view.AtMeetup',
            'Meetcha.view.NextMeetup',
            'Meetcha.view.MeetupList',
            'Meetcha.view.GroupList',
            'Meetcha.view.Find',
            'Meetcha.view.MeetingFind'
        ],
        stores : [
            'Meetcha.store.MeetupStore',
            'Meetcha.store.MyMeetupStore',
            'Meetcha.store.GroupStore',
            'Meetcha.store.MyGroupStore'
        ],
        /*
        * Remembers the last active panel
        */
        lastActiveItem : null,
        /*
        * Remembers the title of the last active panel
        */
        lastActiveTitle : null,
        /*
        * Remembers if meetups or groups were shown last
        */
        lastListType : null,
		control: {
            'homescreen': {
                show: 'showHomeScreenToolbar'
            },
			'homescreen button[action=findmeetups]': {
				tap: 'showFindMeetups'
			},
			'homescreen button[action=mymeetups]': {
				tap: 'showMyMeetups'
			},
			'homescreen button[action=findgroups]': {
				tap: 'showFindGroups'
			},
			'homescreen button[action=mygroups]': {
				tap: 'showMyGroups'
			},
            'homescreen button[action=info]': {
                tap: 'showInfo'
            }
		}
	},

    promptForLogin : function(){
        Ext.Viewport.add({
            xtype: 'panel',
            fullscreen: true,
            zIndex:10,
            items : [{
                xtype: 'panel',
                padding: 15,
                html : '<b>Welcome to Meetcha!</b><br/><br/>' + 
                'This application provides access to nearby Meetups via the Meetup.com community<br/><br/>' +
                'In order to provide personalized service you must login and authorize access to your Meetup.com profile.'
            },{
                xtype: 'button',
                text: 'Authorize',
                width: '90%',
                margin: '30 5%',
                handler: function(){
                    this.up('panel').hide();
                    Ext.Viewport.setMasked({
                        xtype: 'loadmask',
                        message: 'Heading over to Meetup.com...'
                    });
                    window.location.href = serverUrl + 'php/index.php';
                }
            }]
        });
    },

    decideWhatToDo : function(){
        var me             = this,
            upcomingEvents = Ext.create('Meetcha.store.MyMeetupStore'),
            user           = me.getApplication().getController('User').getCurrentUser(),
            dt             = new Date(),
            inTwoHours     = Ext.Date.add(dt, Ext.Date.HOUR, 2);

        upcomingEvents.load({
            params : {
                member_id : user.id,
                time : dt + ',' + inTwoHours
            },
            callback: function(records){
                if(records.length > 0){
                    Ext.Viewport.setMasked({
                        xtype: 'loadmask',
                        message: 'Upcoming meetup(s) found.  Loading Map'
                    });
                    me.showNextMeetup(records[0]);
                } else {
                    me.showHomeScreen();
                }
            }
        });
    },
    /*
    * Display the home screen
    */
    showHomeScreen : function(){
        this.getMeetchaTitleBar().show();
        Ext.Viewport.removeAll();
        Ext.Viewport.add({
            xtype: 'homescreen'
        }).show();
    },
    showHomeScreenToolbar: function() {
        this.getApplication().getController('MeetchaTitleBar').enableHomeView();
    },
    /**
    * Shows the find meetups view.
    */
	showFindMeetups: function() {
        var me = this;
        me.findMeetupList = me.changeState(
            'Meetcha.view.MeetupList',
            'Meetcha.store.MeetupStore',
            'Find Meetups',
            'meetups'
        );
        me.getFindButton().show();
	},
    /**
    * Shows the my meetups view
    */
	showMyMeetups: function() {
        var me = this;
        me.myMeetupList = me.changeState(
            'Meetcha.view.MeetupList',
            'Meetcha.store.MyMeetupStore',
            'My Meetups',
            'meetups'
        );
        me.getFindButton().hide();
	},
    /**
    * Show the find groups view
    */
	showFindGroups: function() {
        var me = this;
        me.findGroupList = me.changeState(
            'Meetcha.view.GroupList',
             'Meetcha.store.GroupStore',
            'Find Groups',
            'groups',
            {
                cls: 'people-list groups find-groups-list'
            }
        );
        me.getFindButton().show();
	},
    /**
    * Show the my groups view
    */
	showMyGroups: function() {
        var me = this;
        me.myGroupList = me.changeState(
            'Meetcha.view.GroupList',
            'Meetcha.store.MyGroupStore',
            'My Groups' ,
            'groups',
            {
                cls: 'people-list groups my-groups-list'
            }
        );
        me.getFindButton().hide();
	},
    showNextMeetup : function(record){
        var me      = this,
            meetups = Ext.create('Meetcha.store.MyMeetupStore');

        meetups.load({
            callback : function(records){
                if(records.length > 0){
                    var record    = records[0],
                        app       = me.getApplication(),
                        self      = record.get('self'),
                        checkedIn = self && self.checked_in,
                        panel     = Ext.create('Meetcha.view.NextMeetup',{
                            'record' : record,
                            'store' : meetups,
                            listeners: {
                                painted: function() {
                                    Ext.Viewport.setMasked(false);
                                }
                            }
                        });

                    Ext.Viewport.removeAll();
                    Ext.Viewport.add(panel).show();
                    app.getController('Map').initMap([record], "meetups");
                    app.getController('MeetchaTitleBar').enableLandingState('Next Meetup');
                }else{
                    Ext.msg.alert('You do not have any meetups yet.');
                }
            }
        });
    },
    /**
    * Retrieve the item store from the last active list.
    */
    getLastActiveListStore : function(){
        return this.getLastActiveItem().getStore();
    },

    refreshActiveStore : function(clearFirst){
        var me       = this,
            app      = me.getApplication(),
            store    = me.getLastActiveListStore(),
            settings = app.getController('Find').getSetting(me.getLastListType()),
            geoCords = app.getController('Geolocation').getCords();

        me.getLastActiveItem().setMasked({
            xtype: 'loadmask',
            message: 'Loading...'
        });

        store.updateFromSettings(settings, geoCords, clearFirst);
    },
    /*
    * Change the main application state
    *@private
    *@param {String} listClass The type of list view to insantiate
    *@param {String} storeClass The type of store to instantiate
    *@param {Ext.view.Panel} existingPanel The existing panel object, may be undefined.
    *@param {String} title The title of the panel.
    *@param {String} listType The type of list that is being instantiated.
    */
    changeState : function(listClass, storeClass, title, listType, listConfig){
        var me                  = this,
            app                 = me.getApplication(),
            appropriateSettings = app.getController('Find').getSetting(listType),
            geoCords            = app.getController('Geolocation').getCords(),
            panel;

        newStore = Ext.create(storeClass);
        newStore.updateFromSettings(appropriateSettings, geoCords);

        panel = Ext.create(listClass,Ext.apply({
            'store' : newStore
        }, listConfig));

        panel.setMasked({
            xtype: 'loadmask',
            message: 'Loading...'
        });

        Ext.Viewport.removeAll();
        Ext.Viewport.add(panel).show();
        me.setLastActiveItem(panel);
        me.setLastActiveTitle(title);
        me.setLastListType(listType);

        app.getController('MeetchaTitleBar').enableListView(title);

        return panel;
    },
    /*
    * Since the List loading mask does not always appear by itself, lets put the list that is in focus into loading
    * manually if we have to.
    */
    setLoading : function(){
        this.getLastActiveItem().setMasked({
            xtype: 'loadmask',
            message: 'Loading...'
        });
    },
    /**
    * Resets the lastActiveItem as the current active item
    */
    goBackToLastState : function(){
        Ext.Viewport.setActiveItem(this.getLastActiveItem());
    },

    showInfo: function() {
        var infoPanel = Ext.create('Ext.Panel',{
            modal : true,
            hideOnMaskTap : true,
            centered : true,
            width : 300,
            height : 250,
            styleHtmlContent : true,
            zIndex:10, // force ontop
            items : [{
                docked : 'top',
                xtype : 'toolbar',
                title : 'Meetcha App'
            }],
            html : "key features of Meetcha App:<br><ul>" + "<li>Built with Sencha Touch 2</li>" + "<li>MVC architecture</li>" + "<li>Meetup API</li>" + "<li>OAuth</li>" + "<li>Local Storage</li>"
        });
        Ext.Viewport.add(infoPanel);
    }
});
