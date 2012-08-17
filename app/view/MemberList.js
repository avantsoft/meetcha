Ext.define('Meetcha.view.MemberList', {
    extend: 'Ext.dataview.List',
    xtype: 'memberlist',
    requires: ['Ext.plugin.ListPaging'],
    config: {
        flex: 1,
        emptyText: 'No Members found (The group may be private)',
        cls: 'people-list',
        disableSelection: true,
        clearSelectionOnDeactivate: true,
        pressedCls: '',
        plugins: [{
            type: 'listpaging',
            autoPaging: true,
            loadMoreText: ''
        }],
        itemTpl: new Ext.XTemplate(
            '<tpl if="photo != undefined">',
                '<div style="float: left;" class="personImage">',
                    '<img src="http://src.sencha.io/60/60/{[this.memberPhoto(values["photo"])]}" />',
                '</div>',
            '</tpl>',
            '<tpl if="member_photo != undefined">',
                '<div style="float: left;" class="personImage">',
                    '<img src="http://src.sencha.io/60/60/{[this.memberPhoto(values["member_photo"])]}" />',
                '</div>',
            '</tpl>',
            '<tpl if="member_name != undefined">',
                '<div style="padding-left: 80px; font-weight: bold;" class="name">',
                    '{[this.ellipsis(values.member_name)]}',
                '</div>',
            '</tpl>',
            '<tpl if="joined != undefined">',
                '<div style="padding-left: 80px;" class="group-name">',
                    'Member Since {[this.formatDate(values.joined)]}<br/>City:&nbsp;{city}',
                '</div>',
            '</tpl>', 
        {
            memberPhoto: function(member_photo) {
                if (member_photo !== undefined) {
                    if (member_photo.thumb_link !== undefined && member_photo['thumb_link'] !== undefined) {
                        return member_photo.thumb_link;
                    } else {
                        return "resources/images/meetup.jpg";

                    }
                }
            },
            ellipsis: function(text) {
                return Ext.util.Format.ellipsis(text, 50);
            },
            formatDate: function(date) {
                return Ext.util.Format.date(date, 'm/d/y');
            }
        })
    }
});
