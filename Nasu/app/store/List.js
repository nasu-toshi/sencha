/**
 * List用Store
 */
Ext.define('Nasu.store.List', {
    extend: 'Ext.data.Store',
    requires: [
        'Nasu.model.List'
    ],
    config: {
        model: 'Nasu.model.List',
        proxy: {
            type: 'ajax',
            url: 'city.json',
            reader: {
                type: 'json',
                rootProperty: 'items'
            }
        },
        autoLoad: true
    }
});