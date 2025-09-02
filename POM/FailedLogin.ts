import { Locator, Page } from "@playwright/test"
import { LoginPage } from "./LoginPage"

export class FailedLogin extends LoginPage {
  constructor(page: Page) {
    super(page);
  }

  async loginWithInvalidCredentials() {
    await this.fillUserName('invalid_user');
    await this.fillPassword('wrong_pass');
    await this.clickLogin();
  }
}