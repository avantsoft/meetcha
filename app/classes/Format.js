Ext.define('Meetcha.util.Format', {
    singleton: true,
    stripTagsRe: /<\/?[^>]+>/gi,
    stripTags: function(value) {
        if (Ext.isString(value)) {
            return value.replace(this.stripTagsRe, '');
        }
    }
});
