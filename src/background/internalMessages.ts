export enum InternalAction {
  ACTIVATE_SESSION = 'ACTIVATE_SESSION',
  SESSION_ALLOW = 'SESSION_ALLOW',
  SESSION_DENY = 'SESSION_DENY'
}
export const echo = (request, sender, sendResponse) => {
  console.log({ request, sender });
};
