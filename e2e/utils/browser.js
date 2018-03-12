import { t } from 'testcafe';
export class Browser {
  constructor(baseURL) {}
  goTo(urlPath) {
    return t.navigateTo(`${this.baseURL}${urlPath}`);
  }
}
