Ext.define('Meetcha.view.GroupList', {
    extend: 'Meetcha.view.MultiActionList',
    xtype: 'grouplist',
    requires: 'Ext.plugin.PullRefresh',
    showLeaveGroup: false,

    config: {
        emptyText: 'No Groups found',
        cls: 'people-list groups',
        plugins: [{
            type: 'pullrefresh',
            pullRefreshText: 'Pull down to refresh groups!'
        }, {
            type: 'listpaging',
            autoPaging: true,
            loadMoreText: ''
        }],
        clearSelectionOnDeactivate: true
    },

    initialize: function() {
        var tpl = '';

        if (this.showLeaveGroup) { 
            tpl +=
            '<div class="ml-rsvp">' +
                '<a class="delete-btn button" href="javascript:null;" action="leaveGroup" mu:id="{id}">Leave Group</a>' +
            '</div>';
        }


        tpl +=
        '<div class="person-image">' +
            '<img src="http://src.sencha.io/60/60/{[this.getGroupPhoto(values)]}" />' +
            '</div>' +
            '<div class="ml-details">' +
                '<div class="gl-name">' +
                '<a href="javascript:null;" action="details" mu:id="{id}">{[this.ellipsis(values.name)]}</a>' +
                '</div>' +
                '<div class="organizer-name">' +
                'Organizer: <i> {[this.getGroupOrganizer(values)]} </i>' +
                '</div>' +
                '<div class="member-count">' +
                '<a class="going-btn button" href="javascript:null;" action="members" mu:id="{id}">{members}&nbsp;Members</a>&nbsp;' +
            '</div>' +
        '</div>';

        this.setItemTpl(new Ext.XTemplate(tpl, {
            getGroupPhoto: function(group) {
                var photo_url_ref;
                if (group.photo_url) {
                    photo_url_ref = group.photo_url;
                } else if (group.group_photo !== undefined) {
                    photo_url_ref = group.group_photo.thumb_link;
                }
                if (!photo_url_ref) {
                    photo_url_ref = "resources/images/meetup.jpg";
                }
                return photo_url_ref;
            },
            getGroupOrganizer: function(group) {
                var organizerName;
                if (group.organizer_name) {
                    organizerName = group.organizer_name;
                } else if (group.organizer.name) {
                    organizerName = group.organizer.name;
                }
                if (!organizerName) {
                    organizerName = "";
                }
                return organizerName;
            },
            ellipsis: function(text) {
                text = Meetcha.util.Format.stripTags(text);
                return Ext.util.Format.ellipsis(text, 50);
            },
            formatDate: function(date) {
                return Ext.util.Format.date(date, 'D m/d H:i');
            }
        }));
        this.callParent();
    }
});
