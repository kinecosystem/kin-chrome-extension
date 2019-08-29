import Vue from 'vue';
import App from './App';

global.browser = require('webextension-polyfill');
Vue.prototype.$browser = global.browser;

const anchor = document.createElement('div');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  document.body.prepend(anchor);
  new Vue({
    el: anchor,
    render: h => h(App)
  });
  sendResponse('msg from cs');
});
