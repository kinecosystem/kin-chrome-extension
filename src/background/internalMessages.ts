export enum InternalAction {
  ACTIVATE_SESSION = 'ACTIVATE_SESSION',
  SESSION_ALLOW = 'SESSION_ALLOW',
  SESSION_DENY = 'SESSION_DENY'
}
export const echo = (request, sender, sendResponse) => {
  console.log({ request, sender });
};

export const sessionAllow = (request, sender, sendResponse) => {
  if (request.action === InternalAction.ACTIVATE_SESSION) {
    console.log('Extension internal -> Session Allow');
    chrome.tabs.sendMessage((sender.tab as chrome.tabs.Tab).id || 0, {
      action: InternalAction.SESSION_ALLOW
    });
  }
};
