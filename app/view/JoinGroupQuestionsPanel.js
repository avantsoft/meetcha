Ext.define('Meetcha.view.JoinGroupQuestionsPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.joingroupquestionspanel',
    config: {
        event_id: 0,
        event_name: '',
        group: '',
        fullscreen: true,
        scroll: 'both',
        cls: 'join-questions',
        items: [{
            xtype: 'toolbar',
            docked: 'bottom',
            layout: {
                pack: 'center'
            },
            items: [{
                xtype: 'button',
                itemId: 'join',
                text: 'Join',
                ui: 'action',
                handler: function(button, event) {
                    this.up('joingroupquestionspanel').joinGroup();
                }
            }, {
                xtype: 'button',
                itemId: 'close',
                text: 'Close',
                ui: 'action',
                handler: function(button, event) {
                    var form = this.up('joingroupquestionspanel');
                    form.enableBubble('questionsClosed');
                    form.fireEvent('questionsClosed');
                }
            }]
        }]
    },
    /*
     * Populate the questions etc that this panel needs from the configuraiton
     */
    initialize: function() {
        var me             = this,
            group          = this.getGroup(),
            grpName        = Ext.util.Format.ellipsis(group.name, 20, false),
            questions      = group.join_info.questions,
            i              = 0,
            questionFields = [], 
            q;

        me.add({
            xtype: 'toolbar',
            docked: 'top',
            itemId: 'topToolbar',
            title: grpName
        });

        if (questions) {
            for (; i < questions.length; i++) {
                q = questions[i];
                questionFields.push({
                    xtype: 'component',
                    html: q.question,
                    cls: 'question-label'
                });

                questionFields.push({
                    xtype: 'textfield',
                    name: q.id,
                    ui: 'dark'
                });
            }
            me.add(questionFields);
        }
    },
    /*
     * Store the answers to the questions in the group object and fire an event
     * alerting the controller to the fact that questions have been answered.
     */
    joinGroup: function() {
        var me = this,
            questions = this.getGroup().join_info.questions,
            i = 0, field, q;

        if (questions) {
            for (; i < questions.length; i++) {
                q = questions[i];
                field = me.getFields(q.id);
                q.answer = field.getValue();
            }
            me.enableBubble('questionsAnswered');
            me.fireEvent('questionsAnswered', me.getGroup(), me.getEvent_id(), me.getEvent_name());
        }
    }

});
