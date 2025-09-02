import { expect, Locator, Page } from "@playwright/test"

export class AdvancedLogin {
  page: Page;

  constructor(page: Page) {
    this.page = page
    }

    async goTo(){
        await this.page.goto('https://the-internet.herokuapp.com/login')
    }

    async fillInvalidCredentials() {
        await this.page.locator('#username').fill('user123')
        await this.page.locator('#password').fill('password123')
        await this.page.locator('button[type="submit"]').click()
        const Failed = this.page.locator('#flash.flash.error')
        await expect(Failed).toContainText('Your username is invalid!')
    }

    async fillValidCredentials(username: string = 'tomsmith', password: string = 'SuperSecretPassword!')
    {
        await this.page.locator('#username').fill(username)
        await this.page.locator('#password').fill(password)
        await this.page.locator('button[type="submit"]').click()
        const Success = this.page.locator('#flash.flash.success')
        await expect(Success).toContainText('You logged into a secure area!')
    }

    async Logout(){
        await this.page.locator('.button.secondary.radius').click()
        const LogoutMessage = this.page.locator('#flash.flash.success')
        await expect(LogoutMessage).toContainText('You logged out of the secure area!')
    }
}