Ext.define('Meetcha.controller.Find', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            'overlay': 'customoverlay',
            'settingsFind': 'settingsfind',
            'meetchaTitleBar': 'meetchatitlebar'
        },
        meetupSettings: undefined,
        groupSettings: undefined,
        listType: undefined,
        models: ['FindSettings'],
        views: ['CustomOverlay', 'Find', 'MeetingFind']
    },
    /*
     * Determine the appropriate course of action when a user clicks on find.
     */
    onFindClick: function() {
        var me             = this,
            app            = me.getApplication(),
            homeController = app.getController('HomeScreen'),
            lastListType   = homeController.getLastListType(),
            geoEnabled  = app.getController('Geolocation').getGeolocationIsSupported();
        me.setListType(lastListType);
        me.showFind(geoEnabled);
    },
    /*
     * Get the appropriate setting for the passed list type
     */
    getSetting: function(listType) {
        if (listType == "groups") {
            return this.getGroupSettings();
        } else if (listType == "meetups") {
            return this.getMeetupSettings();
        }
    },
    /**
     * Setup settings for the current user.
     */
    initializeSettings: function(callback) {
        var me                    = this,
            numberSettingsLoaded  = 0,
            user                  = me.getApplication().getController('User').getCurrentUser(),
            userId                = user.id,
            meetupsSettingId      = userId + 'meetups',
            groupsSettingId       = userId + 'groups',
            incrementSettingsLoad = function() {
                numberSettingsLoaded++;
                if (numberSettingsLoaded == 2) {
                    callback && callback();
                }
            };

        Meetcha.model.FindSettings.load(meetupsSettingId, {
            failure: function(resp) {
                var rec = Ext.create('Meetcha.model.FindSettings', {
                    id: meetupsSettingId,
                    Distance: 25,
                    Time: 5,
                    'Location': true,
                    ZipCode: 94063
                });

                rec.save();
                me.setMeetupSettings(rec);
                incrementSettingsLoad();
            },
            success: function(resp) {
                me.setMeetupSettings(resp);
                incrementSettingsLoad();
            }
        });

        Meetcha.model.FindSettings.load(groupsSettingId, {
            failure: function(resp) {
                var rec = Ext.create('Meetcha.model.FindSettings', {
                    id: groupsSettingId,
                    Distance: 25,
                    'Location': true,
                    ZipCode: 94063
                });

                rec.save();
                me.setGroupSettings(rec);
                incrementSettingsLoad();
            },
            success: function(resp) {
                me.setGroupSettings(resp);
                incrementSettingsLoad();
            }
        });
    },
    /*
     * Load the find settings record for this user, then show the modal.
     */
    showFind: function(geoEnabled) {
        var recordId       = this.getSettingsRecordId(),
            settingsRecord = Meetcha.model.FindSettings.load(recordId, {
                success: function(record, operation) {
                    this.showSettings(record, geoEnabled);
                },
                scope: this
            });
    },
    /*
     * Show the settings dialog with the settings record.
     */
    showSettings: function(record, geoEnabled) {
        var me    = this,
            title = me.getApplication().getController('HomeScreen').getLastActiveTitle(),
            findSettingsForm;


        if (me.getListType() === 'groups') {
            findSettingsForm = Ext.create('Meetcha.view.Find', {
                geoEnabled: geoEnabled
            });
        } else {
            findSettingsForm = Ext.create('Meetcha.view.MeetingFind');
        }

        findSettingsForm = findSettingsForm.setRecord(record);

        overlay = Ext.create('Meetcha.view.CustomOverlay', {
            items: findSettingsForm,
            buttonLabel: 'Find',
            buttonHandler: function() {
                me.doFind();
            },
            title: title
        });

        me.getMeetchaTitleBar().hide();
        overlay.show();
    },

    doFind: function() {
        var me             = this,
            app            = me.getApplication(),
            overlay        = me.getOverlay(),
            settings       = me.getSettingsFind();
            record         = settings.getRecord(),
            modelValues    = settings.getModelValuesFromForm(),
            homeController = app.getController('HomeScreen'),
            listStore      = homeController.getLastActiveListStore(),
            cords          = app.getController('Geolocation').getCords();

        modelValues.id = record.get('id');
        record.setData(modelValues);
        record.save();

        listStore.updateFromSettings(record, cords, true);
        homeController.setLoading();
        Ext.Viewport.remove(overlay);
    },

    getSettingsRecordId: function() {
        var me       = this,
            user     = me.getApplication().getController('User').getCurrentUser(),
            listType = me.getListType();

        return user.id + listType;
    }
});
