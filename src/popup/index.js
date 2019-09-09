import Vue from 'vue';
import App from './App';

global.browser = require('webextension-polyfill');
Vue.prototype.$browser = global.browser;
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    render: h => h(App)
})