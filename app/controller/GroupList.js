Ext.define('Meetcha.controller.GroupList', {
    extend: 'Meetcha.controller.CommonInteractions',
    requires: ['Meetcha.model.GroupMember', 'Meetcha.store.GroupMemberStore'],
    config: {
        control: {
            'grouplist': {
                actionTap: 'onActionTap'
            }
        },
        stores: ['GroupMemberStore', 'GroupStore', 'MyGroupStore'],
        models: ['GroupMember', 'Group'],
        views: ['GroupList', 'CustomOverlay'],
        memberStore: 'GroupMemberStore'
    },
    onActionTap: function(list, action, record, event, target) {
        var me = this;
        switch (action) {
            case 'details':
                me.onDetailsClick(record);
                break;
            case 'members':
                me.onMembersClick(record);
                break;
            case 'leaveGroup':
                me.onLeaveGroupClick(record);
                break;
        }
    }
});
