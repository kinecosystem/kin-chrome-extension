import { InternalAction } from '../background/InternalMessages';

(() => {
  const btn = document.querySelector('#btn') as HTMLButtonElement;
  btn.onclick = () => {
    console.log('Session popup -> Button Clicked');
    chrome.runtime.sendMessage({ action: InternalAction.ACTIVATE_SESSION });
  };
})();
