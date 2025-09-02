import { test, expect } from '@playwright/test';
import { LoginPage } from './POM/LoginPage';
import { FailedLogin } from './POM/FailedLogin';

test('Purchase an item', async ({ page }) => {

  await page.goto('https://www.saucedemo.com')

  const loginPage = new LoginPage(page)
  await loginPage.fillUserName()
  //await page.screenshot({ path: 'tests/Screenshots/user-name.png', fullPage:true });
  await loginPage.fillPassword()
  await loginPage.clickLogin()

  const itemsContainer = await page.locator('#inventory_container .inventory_list .inventory_item').all()
  const randomIndex = Math.floor(Math.random() * itemsContainer.length)
  const randomItem = itemsContainer[randomIndex]

  const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText()//Class se usa punto
  const expectedName = await randomItem.locator('.inventory_item_name').innerText()//Class se usa punto
  const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()//Class se usa punto

  console.log(`Description: ${expectedDescription} \nName: ${expectedName} \nPrice: ${expectedPrice}`)

  await randomItem.getByRole('button', {name:'Add to cart'}).click()
  await page.locator('a.shopping_cart_link').click()

  expect(page.getByRole('button', {name: 'Checkout'})).toBeVisible()

  const actualName = await page.locator('.inventory_item_name').innerText()
  const actualDescription = await page.locator('.inventory_item_desc').innerText()
  const actualPrice = await page.locator('.inventory_item_price').innerText()

  expect(actualName).toEqual(expectedName)
  expect(actualDescription).toEqual(expectedDescription)
  expect(actualPrice).toEqual(expectedPrice)

  await page.getByRole('button', {name: 'Checkout'}).click()

  await page.getByRole('textbox', {name: 'First Name'}).fill('Homer')
  await page.getByRole('textbox', {name: 'Last Name'}).fill('Simpson')
  await page.getByRole('textbox', {name: 'Zip/Postal Code'}).fill('12345')

  await page.getByRole('button', {name: 'Continue'}).click()
  await page.getByRole('button', {name: 'Finish'}).click()

  const HeaderMessage = await page.locator('.complete-header').innerText()
  const BodyMessage =await page.locator('.complete-text').innerText()

  expect(HeaderMessage).toEqual("Thank you for your order!")
  expect(BodyMessage).toEqual("Your order has been dispatched, and will arrive just as fast as the pony can get there!")

  console.log(HeaderMessage, BodyMessage)
  await page.waitForTimeout(2000)
});

test('Capture first item text', async ({ page }) => {

  await page.goto('https://www.saucedemo.com')

  const loginPage = new LoginPage(page)
  await loginPage.fillUserName()
  //await page.screenshot({ path: 'tests/Screenshots/user-name.png', fullPage:true });
  await loginPage.fillPassword()
  await loginPage.clickLogin()

  const itemsContainer = page.locator('#inventory_container .inventory_list .inventory_item') 
  const FirstItem = page.locator('.inventory_item_name').first()
  await expect(FirstItem).toBeVisible()

  const FirstItemName = await FirstItem.innerText()
  console.log(FirstItemName)
  //console.log(FirstItem?.innerText()) 

});

test('Failed Login', async ({ page }) => {

  const loginPage = new FailedLogin(page)
  await page.goto('https://www.saucedemo.com')

  await loginPage.loginWithInvalidCredentials()

  const FailedLoginMessage = page.locator('[data-test="error"]')
  await expect(FailedLoginMessage).toBeVisible()

  const ErrorMessage = await FailedLoginMessage.innerText()
  expect(ErrorMessage).toBe('Epic sadface: Username and password do not match any user in this service')
});

test('Login Unavailable', async ({ page }) => {

  const loginPage = new LoginPage(page)
  await page.goto('https://www.saucedemo.com')

  await loginPage.clickLogin()

  const MissingCredentials = page.locator('[data-test="error"]')
  await expect(MissingCredentials).toHaveText('Epic sadface: Username is required')
});