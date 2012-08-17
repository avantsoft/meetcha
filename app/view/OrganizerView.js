//not tested in 2.0, mostly not tested in 1.1
Ext.define('Meetcha.view.OrganizerView', {
    extend: 'Ext.dataview.List',
    xtype: 'organizerview',
    config: {
        store: 'OneMemberStore',
        cls: 'people-list',
        layout: 'fit',
        itemTpl: new Ext.XTemplate(
            '<div style="float: left;" class="personImage"><img src="http://src.sencha.io/60/60/{[this.meetupPhoto(values.photo.thumb_link)]}" /></div>', 
            '<div style="padding-left: 80px; font-weight: bold;" class="name">{[this.ellipsis(values.name)]}</div>', 
        {
            meetupPhoto: function(photo_url_ref) {
                console.log("got a single picture");
                if (photo_url_ref) {
                    return photo_url_ref;
                } else {
                    return "resources/images/meetup.jpg";
                }
            },
            ellipsis: function(text) {
                return Ext.util.Format.ellipsis(text, 50);
            }
        }),
        // end itemTpl
        listeners: {
            activate: function(organizerView) {
                this.load();
            }
        }
    },
    load: function(options) {
        console.log("In load of one members details");
        this.getStore().load();
    }
});
