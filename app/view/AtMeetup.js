// this class expects id, store config options
Ext.define('Meetcha.view.AtMeetup', {
    requires: ['Meetcha.view.MeetupSummary'],
    extend: 'Ext.Container',
    alias: 'widget.atmeetup',
    config: {
        layout: {
            type: 'fit'
        },
        store: null,
        checkedIn: false,
        summaryTpl: null
    },
    initialize: function(config) {
        var me = this,
            checkedIn = me.getCheckedIn();
        me.add({
            xtype: 'meetupsummary',
            padding: 10,
            tpl: me.getSummaryTpl(),
            record: me.getRecord(),
            checkedInAlready: checkedIn,
            flex: 1
        });

        me.add({
            docked: 'bottom',
            xtype: 'toolbar',
            layout: {
                pack: 'center'
            },
            items: [{
                xtype: 'button',
                disabled: true,
                handler: function() {
                    if (!me.getCheckedIn()) {
                        me.fireEvent('checkIn', me.getRecord());
                    }
                }
            }]
        });

        me.setButtonState();
        me.on({
            joinDirectRsvp: function() {
                me.down('button').enable();
            },
            cancel: function() {
                me.down('button').disable();
            }
        });
        me.callParent();
    },
    updateCheckin: function() {
        this.setCheckedIn(true);
        this.setButtonState();
    },
    setButtonState: function() {
        var checkedIn = this.getCheckedIn(),
            btnText = checkedIn ? 'CHECKED IN' : 'CHECK IN',
            button = this.down('button'),
            record = this.getRecord(),
            self = record.get('self');

        button.setText(btnText);
        if (self && self.rsvp && self.rsvp.response == 'yes') {
            button.enable();
        } else {
            button.disable();
        }
    },
    setMasked: function() {
        return false;
    }
});
