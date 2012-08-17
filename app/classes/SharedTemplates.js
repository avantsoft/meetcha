Ext.define('Meetcha.classes.SharedTemplates',{
    statics : {
        /*
        * A template for rendering a summary of a meetup event. Expects to be boudn to a Meetup record.
        */
        meetupSummary : Ext.create('Ext.XTemplate',
            // Right Column
            '<div class="ml-rsvp">',
                '<tpl if="!self">',
                    // RSVP
                    '<a class="add-btn button" href="javascript:null;" action="join" mu:id="{id}">RSVP</a>',
                '<tpl elseif="this.hasWait(values)">',
                    // Wait List
                    'Wait List',
                '<tpl elseif="this.hasRsvp(values)">',
                    '<tpl if="this.isAttending(values)">',
                    // Attend + Cancel
                    'Going<br/><a class="checkmark-btn button summary-cancel" href="javascript:null;" action="cancel" mu:id="{id}">Cancel</a>',
                    '<tpl else>',
                        // Attend
                        '<a class="add-btn button summary-rsvp" href="javascript:null;" action="joinDirectRsvp" mu:id="{id}">RSVP</a>',
                    '</tpl>',
                '<tpl else>',
                    '<a class="add-btn button summary-rsvp" href="javascript:null;" action="joinDirectRsvp" mu:id="{id}">RSVP</a>',
                '</tpl>',
            '</div>',

            // Left Column
            '<div class="ml-date">',
                // Date & Time
                '<div class="date-time">',
                    '<div class="calendar">',
                        '<div class="month">',
                            '{time:date("M")}',
                        '</div>',
                        '<div class="date">',
                            '{time:date("j")}',
                        '</div>',
                    '</div>',
                    '<div class="day">',
                        '{time:date("D")}',
                    '</div>',
                    '<div class="time">',
                        '{time:date("g:i a")}',
                    '</div>',
                '</div>',
            '</div>',

            // Middle Column
            '<div class="ml-details">',
                // Meeting Name
                '<div class="meeting-name">',
                    '<a href="javascript:null;" action="details" class="detail summary-detail" mu:id="{id}">{name:ellipsis(50, true)}</a>',
                '</div>',

                // Group Name
                '<div class="group-name">',
                    '{group.name:ellipsis(50, true)}<br/>',
                '</div>',

                // Location Name
                '<div class="location-name">',
                    '<tpl if="venue">{venue.address_1}',
                    '<tpl else>Address information not available',
                    '</tpl>',
                    '<tpl if="distance"> | {distance} miles</tpl>',
                '</div>',

                // Going + Comments
                '<div class="going-comments">',
                    '<a class="going-btn button summary-going" href="javascript:null;" action="going" mu:id="{id}">',
                        '{yes_rsvp_count} Going</a>',
                    '<a class="comments-btn button summary-comments" href="javascript:null;" mu:id="{id}" action="comments">Comments</a>',
                '</div>',
            '</div>',
            {
                hasWait: function(meetup) {
                    return meetup.self.actions && (meetup.self.actions.indexOf('wait') != -1);
                },

                hasRsvp: function(meetup) {
                    var findMeetupsSelfRsvp = (meetup.self.actions && (meetup.self.actions.indexOf('rsvp') != -1)),
                        myMeetupsSelfRsvp   = (meetup.self['rsvp'] !== undefined && meetup.self['rsvp'] == true),
                        selfDetected        = meetup['self'] !== undefined;
                    return findMeetupsSelfRsvp || myMeetupsSelfRsvp || selfDetected;
                },

                isAttending: function(meetup) {
                    return meetup.self.rsvp && meetup.self.rsvp.response == 'yes';
                }
            }
        )
    }
});