/**
 * Top画面
 */
Ext.define('Nasu.view.Top', {
    extend: 'Ext.Container',
    xtype: 'app-top',
    requires: [
        'Ext.Img'
    ],
    config: {
        centered: true,
        items: [{
            xtype: 'image',
            id: 'topImage',
            src: 'resources/images/nasu.png',
            width: 200,
            height: 120
        }]
    },

    /**
     * 初期処理
     */
    initialize: function() {
        //<debug>
        console.log(Ext.getDisplayName(arguments.callee));
        //</debug>

        this.callParent(arguments);

        var me = this;
        var img = this.down('#topImage');

        if ( img ) {
            img.addListener('tap', function() {
                me.fireEvent('imgTap');
            }, me);
        }
    }
});
