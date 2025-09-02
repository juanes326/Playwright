import { Page } from "@playwright/test";

export class AdvancedFailedLogin {
    page: Page
    constructor(page: Page) {
  }

  async loginWithInvalidCredentials() {
    await this.fillUserName('invalid_user');
    await this.fillPassword('wrong_pass');
    await this.clickLogin();
  }
}