import { expect, Locator, Page } from "@playwright/test"

export class StartLoading {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickStartLoading() {
    await this.page.getByRole('button', {name: 'Start'}).click()
    const HelloWorld = this.page.getByRole('heading', {name: 'Hello World!'})
    await HelloWorld.waitFor({state: 'visible'})   
    await expect(HelloWorld).toHaveText("Hello World!")
  }
}