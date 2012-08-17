Ext.define('Meetcha.view.CommentForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.commentform',
    config: {
        width: '100%',
        scrollable: 'false',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'textareafield',
            name: 'comment',
            cls: 'comment-input',
            required: true,
            autofocus: true,
            height: 90,
            flex: 1
        }, {
            xtype: 'button',
            ui: 'action',
            iconCls: 'add',
            iconMask: true,
            height: 38,
            cls: 'add-btn',
            action: 'addComment'
        }]
    }
});
