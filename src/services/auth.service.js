import { UserManager, WebStorageStateStore } from 'oidc-client';
import { STS_URL } from './constants';

export const token = '';
export class AuthService {
  static userManager;

  static user;

  constructor() {
    // Log.logger = console;
    this.setupUserManager();
  }

  login = () => this.userManager.signinRedirect();

  logout = () => this.userManager.signoutRedirect();

  register() {
    window.location.href = `${
      this.userManager.settings.authority
    }/account/register?returnUrl=${window.location.href}`;
  }

  profile = () => {
    window.location.href = `${
      this.userManager.settings.authority
    }/manage/index`;
  };

  isLoggedIn = () => this.user && this.user.access_token && !this.user.expired;

  getAccessToken = () => (this.user ? this.user.access_token : '');

  signoutRedirectCallback = () => this.userManager.signoutRedirectCallback();

  setupUserManager = () => {
    const config = {
      authority: STS_URL,
      client_id: 'spa-client',
      redirect_uri: `${window.location.origin}/assets/login-redirect.html`,
      scope: 'openid spa-api profile offline_access',
      response_type: 'id_token token',
      post_logout_redirect_uri: `${window.location.origin}?postLogout=true`,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      automaticSilentRenew: true,
      silent_redirect_uri: `${window.location.origin}/assets/silent-renew.html`
    };
    this.userManager = new UserManager(config);
  };
}
