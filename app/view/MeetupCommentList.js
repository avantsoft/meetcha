Ext.define('Meetcha.view.MeetupCommentList', {
    extend: 'Ext.dataview.List',
    alias: 'widget.meetupcommentlist',
    flex: 1,
    config: {
        flex: 1,
        id: 'meetupCommentListId',
        emptyText: '&nbsp;No comments',
        pressedCls: '',
        allowDeselect: false,
        disableSelection: true,
        clearSelectionOnDeactivate: true,
        scrollable: true,
        minHeight: '300',
        itemTpl: new Ext.XTemplate(
            '<div style="float: left;" class="personImage"><img src="http://src.sencha.io/60/60/{[this.meetupPhoto(values.member_photo)]}" /></div>' + 
            '<div style="padding-left: 80px; font-weight: bold;" class="name">{member_name}</a></div>' + 
            '<div style="padding-left: 80px; font-size:0.875em" class="name">{comment}</div>' + 
            '<div style="padding-left: 80px; font-weight: bold; font-size:0.875em " class="name">{[this.formatDate(values.time)]}</div>', 
            {
            meetupPhoto: function(photo_url_ref) {
                if (photo_url_ref.thumb_link) {
                    return photo_url_ref.thumb_link;
                } else {
                    return "resources/images/meetup.jpg";
                }
            },
            formatDate: function(date) {
                return Ext.util.Format.date(date, 'D m/d H:i');
            }
        })
    }
});
