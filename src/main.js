var store = require('./store');

store.Adapter.host = '';

store.find('user', 1);

window.Store = store;