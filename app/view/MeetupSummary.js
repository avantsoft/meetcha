Ext.define('Meetcha.view.MeetupSummary', {
    alias: 'widget.meetupsummary',
    extend: 'Ext.Component',
    config: {
        emptyText: 'No Meetups found',
        cls: 'meetup-list summary-display'
    },

    initialize: function() {
        this.callParent(arguments);

        this.mon(
            this.element,
            'tap',
            function(event, target) {
                var action  = target.getAttribute('action'),
                    id      = target.getAttribute('mu:id'),
                    record  = id && this.getRecord();

                this.fireEvent(action, record);
            },
            this,
            {
                delegate: 'a[action]',
                element: 'innerElement'
            }
        );
    }
});
