import Vue from 'vue';
import App from './App';
import { MessageExternalActions } from '../message_external_actions/actions_consts';

global.browser = require('webextension-polyfill');
Vue.prototype.$browser = global.browser;
Vue.config.productionTip = false;

const anchor = document.createElement('div');
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === MessageExternalActions.SIGN) {
    const TIMEOUT = 10000;
    const REPONSES = {
      REJECT: 'REJECT',
      OK: 'OK'
    };
    document.body.prepend(anchor);
    new Vue({
      el: anchor,
      data: {
        response_sent: false
      },
      created: function() {
        setInterval(() => {
          if (!this.response_sent) sendResponse(REPONSES.REJECT);
        }, TIMEOUT);
      },
      methods: {
        verify: function() {
          this.response_sent = true;
          sendResponse(REPONSES.OK);
        }
      },
      render: h => h(App)
    });
    return true;
  }
});
