/**
 * 一覧画面
 */
Ext.define('Nasu.controller.List', {
    extend: 'Ext.app.Controller',
    requires: [
        'Nasu.view.Detail',
        'Ext.util.Geolocation'
    ],
    config: {

        /**
         * 参照設定
         */
        refs: {
            top: 'app-top',
            list: 'app-list',
            detail: 'app-detail'
        },

        /**
         * イベント定義
         */
        control: {
            'app-top': {
                imgTap: 'onTopImgTap'
            },
            'app-list #cityList': {
                disclose: 'onListDisclose'
            },
            'app-list': {
                pop: 'onDetailPop',
                back: 'onBack',
                btnTap: 'onBtnTap'
            },
            'app-detail': {
                maprender: 'onDetailMapRender',
                btnTap: 'onBtnTap'
            }
        },

        /**
         * 選択行データを保持
         */
        selectedData: null
    },

    /**
     * 矢印ボタンタップイベント
     */
    onListDisclose: function(me, record, target, index, e, eOpts) {
        //<debug>
        console.log(Ext.getDisplayName(arguments.callee));
        //</debug>

        // 選択されたデータを退避
        this.setSelectedData(record);

        // 詳細画面を表示
        this.getList().push({
            xtype: 'app-detail',
            title: record.get('name'),
            selectedData: record
        });

        // closeボタンをFunctionボタンに切り替え
        this._chgBtnIcon();
    },

    /**
     * 詳細画面の破棄処理
     */
    onDetailPop: function(me, view, eOpts) {
        //<debug>
        console.log(Ext.getDisplayName(arguments.callee));
        //</debug>

        // 若干の遅延後に破棄
        Ext.Function.defer(function(){
            me.remove(view, true);
        }, 100); 
    },

    /**
     * Map再描画時に中央がずれてしまうので、その補正処理（しょうがないみたい）
     */
    onDetailMapRender: function(me, map, eOpts ) {
        //<debug>
        console.log(Ext.getDisplayName(arguments.callee));
        //</debug>

        var lat = me.getSelectedData().get('latitude');
        var lng = me.getSelectedData().get('longitude');
        var latLng = new google.maps.LatLng(lat, lng);
        
        map.setCenter(latLng);
    },

    /**
     * Top画面からList画面に遷移
     */
    onTopImgTap: function(me, e, eOpts) {
        //<debug>
        console.log(Ext.getDisplayName(arguments.callee));
        //</debug>

        Ext.Viewport.add(Ext.create('Nasu.view.List'));
        Ext.Viewport.remove(Ext.ComponentQuery.query('app-top')[0]);
    },

    /**
     * NavigationBar右側のボタンタップイベント（List, Detailの両方から呼ばれる）
     */
    onBtnTap: function(me, e, eOpts) {
        //<debug>
        console.log(Ext.getDisplayName(arguments.callee));
        //</debug>

        var btn = me.down('#btnFunction');
        var selectedData = this.getSelectedData();
        var detail = this.getDetail();

        // ×ボタンタップ
        if ( btn && btn.getIconCls() === 'delete' ) {
            Ext.Viewport.add(Ext.create('Nasu.view.Top'));
            Ext.Viewport.remove(Ext.ComponentQuery.query('app-list')[0]);
            return;
        }

        // 設定ボタンタップ
        var geo = Ext.create('Ext.util.Geolocation', {
            autoUpdate: false,
            listeners: {
                locationupdate: function(geo) {

                    var directionsDisplay = new google.maps.DirectionsRenderer();
                    directionsDisplay.setMap(detail.getMap());

                    var start = new google.maps.LatLng(geo.getLatitude(), geo.getLongitude());
                    var end = new google.maps.LatLng(selectedData.get('latitude'), selectedData.get('longitude'));
                    var directions = new google.maps.DirectionsService();       // ルート生成

                    // ルートリクエスト
                    directions.route({
                        origin:start,                                           // 開始地点
                        destination:end,                                        // 終了地点
                        travelMode:google.maps.DirectionsTravelMode.DRIVING,    // ルートタイプ(車)
                        avoidHighways:true,                                     // 高速道路(使わない)
                        avoidTolls:true,                                        // 有料道路(使わない)
                        optimizeWaypoints: true,                                // 最適化された最短距離にする。
                    },
                    function(results, status) {
                        if (status === google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(results);
                        } else {
                            alert('経路検索失敗');
                        }
                    });
                },
                locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {

                    if(bTimeout){
                        alert('現在位置取得タイムアウト');
                    } else {
                        alert('現在位置取得エラー');
                    }
                }
            }
        });
        geo.updateLocation();
    },

    /**
     * backボタンタップイベント
     */
    onBack: function() {
        //<debug>
        console.log(Ext.getDisplayName(arguments.callee));
        //</debug>

        this._chgBtnIcon();
    },

    /**
     * ヘッダ右側のボタンアイコンの切り替え
     */
    _chgBtnIcon: function() {

        var btn = Ext.ComponentQuery.query('#btnFunction')[0];
        if ( !btn ) {
            return;
        }

        if ( btn.getIconCls() === 'settings' ) {
            btn.setIconCls('delete');
        }
        else {
            btn.setIconCls('settings');
        }
    }
});