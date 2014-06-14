/**
 * 一覧画面
 */
Ext.define('Nasu.view.List', {
    extend: 'Ext.navigation.View',
    xtype: 'app-list',
    requires: [
        'Ext.dataview.List',
        'Nasu.store.List'
    ],
    config: {
        fullscreen: true,
        navigationBar: {
            id: 'naviBar',
            items: [{
                xtype: 'button',
                itemId: 'btnFunction',
                align: 'right',
                iconCls: 'delete'
            }]
        },
        items: [
            {
                id: 'cityList',
                title: '都市を選択',
                xtype: 'list',
                fullscreen: true,
                itemTpl: '{name}',
                onItemDisclosure: true,
                emptyText: 'No Data',
                store: 'List'
            }
        ]
    },

    /**
     * 初期処理
     */
    initialize: function(me, eOpts) {
        //<debug>
        console.log(Ext.getDisplayName(arguments.callee));
        //</debug>

        this.callParent(arguments);
        
        // イベント付与
        var btnElem = this.down('#btnFunction');
        if ( btnElem ) {
            btnElem.addListener('tap', this._btnTap, this);
        }
    },

    /**
     * backボタンタップ時
     */
    back: function() {
        //<debug>
        console.log(Ext.getDisplayName(arguments.callee));
        //</debug>

        this.fireEvent('back', this);
    },

    /**
     * Functionボタンタップイベント
     */
    _btnTap: function() {
        this.fireEvent('btnTap', this);
    }
});
