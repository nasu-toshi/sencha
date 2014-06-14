/**
 * 詳細画面
 */
Ext.define('Nasu.view.Detail', {
    extend: 'Ext.Map',
    xtype: 'app-detail',
    requires: [
        'Ext.LoadMask'
    ],
    config: {
        useCurrentLocation: false,
        autoUpdate: false,

        /**
         * コントローラからのデータ受け渡し用
         */
        selectedData: null
    },

    /**
     * 初期処理
     */
    initialize: function() {
        //<debug>
        console.log(Ext.getDisplayName(arguments.callee));
        //</debug>

        this.callParent(arguments);

        // 初期描画位置を指定
        var lat = this.getSelectedData().get('latitude');
        var lng = this.getSelectedData().get('longitude');
        this.setMapCenter({
            lat: lat,
            lng: lng
        });

        // 倍率指定
        this.setMapOptions({
            zoom: 16
        });
    },

    /**
     * backボタンタップ時
     */
    back: function() {
        //<debug>
        console.log(Ext.getDisplayName(arguments.callee));
        //</debug>

        this.fireEvent('back', this);
    }
});
