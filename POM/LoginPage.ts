import { Locator, Page } from "@playwright/test"

export class LoginPage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillUserName(username: string = 'standard_user') {
    await this.page.locator('#user-name').fill(username);
  }

  async fillPassword(password: string = 'secret_sauce') {
    await this.page.locator('#password').fill(password);
  }

  async clickLogin() {
    await this.page.locator('#login-button').click();
  }

  async loginAsStandardUser() {
    await this.fillUserName();
    await this.fillPassword();
    await this.clickLogin();
  }
}