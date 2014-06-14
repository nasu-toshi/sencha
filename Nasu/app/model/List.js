/**
 * データ定義
 */
Ext.define('Nasu.model.List', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'id',  type: 'int'},
            {name: 'name', type: 'string'},
            {name: 'latitude', type: 'float'},
            {name: 'longitude', type: 'float'}
        ]
    }
});