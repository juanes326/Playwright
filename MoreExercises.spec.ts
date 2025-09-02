import test, { expect, Page } from "@playwright/test";
import { StartLoading } from "./POM/StartLoading";
import { AdvancedLogin } from "./POM/AdvancedLogin";
import { CombinedControls } from "./POM/CombinedControls";

test('Combined controls', async ({ page }) => {

  const accion = new CombinedControls(page)

  await page.goto('https://the-internet.herokuapp.com/login')

  await accion.hacerLoginfallido("usuario", "contraseña")
  await accion.getErrormessage()
  await accion.hacerLoginexitoso("tomsmith", "SuperSecretPassword!")
  await accion.getSuccessmessage()
  await accion.hacerLogout()

  /*await page.getByRole('textbox', {name: 'Username'}).fill("Username")
  await page.getByRole('textbox', {name: 'Password'}).fill("Password")
  await page.locator('button[type="submit"]').click()

  const Warning = page.locator('#flash.flash.error')
  await expect(Warning).toContainText('Your username is invalid!')

  await page.getByRole('textbox', {name: 'Username'}).fill("tomsmith")
  await page.getByRole('textbox', {name: 'Password'}).fill("SuperSecretPassword!")
  await page.locator('button[type="submit"]').click()

  const Success = page.locator('#flash.flash.success')
  await expect(Success).toContainText('You logged into a secure area!')
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure')

  await page.locator('a.button.secondary.radius').click()
  const Logout = page.locator('#flash.flash.success')
  await expect(Logout).toContainText(' You logged out of the secure area!')
  
  await page.waitForTimeout(1000)*/
});

test('Timeout and Functions', async ({ page }) => {

const startLoading = new StartLoading(page)
await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2')
await startLoading.clickStartLoading()
});

test('Advanced Exercise', async ({ page }) => {

    const advance = new AdvancedLogin(page)

    await advance.goTo()
    await advance.fillInvalidCredentials()
    await advance.fillValidCredentials()
    await advance.Logout()

    await page.waitForTimeout(1000)
});