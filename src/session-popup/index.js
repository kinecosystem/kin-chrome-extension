import Vue from 'vue';
import App from './App';
import { MessageExternalActions } from '../messageExternalActions/actionsConsts';
import * as REPONSES from './consts';

global.browser = require('webextension-polyfill');
Vue.prototype.$browser = global.browser;
Vue.config.productionTip = false;

const anchor = document.createElement('div');
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === MessageExternalActions.SIGN) {
    console.log('injected: SIGN Action verify');
    document.body.prepend(anchor);
    const VueApp = new Vue({
      el: anchor,
      data: {
        response_sent: false
      },
      methods: {
        verify: function() {
          if (!this.response_sent) {
            console.log('injected: verify -> called!');
            this.response_sent = true;
            sendResponse(REPONSES.OK);
            // destroy the vue listeners, etc
            this.$destroy();
            // remove the element from the DOM
            this.$el.parentNode.removeChild(this.$el);
          }
        }
      },
      render: h => h(App)
    });

    const TIMEOUT = 10000;
    setTimeout(() => {
      if (!VueApp.response_sent) {
        console.log('injected: verify -> rejected!');
        sendResponse(REPONSES.REJECT);
        VueApp.response_sent = true;
        // destroy the vue listeners, etc
        this.$destroy();

        // remove the element from the DOM
        this.$el.parentNode.removeChild(this.$el);
      }
    }, TIMEOUT);

    return true;
  }
});
