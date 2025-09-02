import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Test Case 1', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co')
  await page.locator('input[id=\'cb1-edit\']').fill('iphone 14 pro max')
  await page.keyboard.press('Enter')
  expect(page.locator('//ol[contains(@class, \'ui-search-layout\')]')).toBeVisible
  const titles = await page.locator('//ol[contains(@class, \'ui-search-layout__item\')]//li//h3').allInnerTexts()
  console.log('The total number of results was: ', titles.length)
  for (let title of titles)
  {
    console.log('the title is: ', title)
  }
  await page.waitForTimeout(5000);
});

test('Test Case 2', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co')
  await page.getByRole('link', {name: 'Mis compras'}).click();
  await page.waitForTimeout(5000);
});

test('Purchase an item', async ({ page }) => {
  await page.goto('https://www.saucedemo.com')

  const UserName = page.locator('input[id=\'user-name\']')
  const Password = page.locator('input[id=\'password\']')
  const LoginButton =  page.locator('input[id=\'login-button\']')

  await UserName.click()
  await UserName.fill("standard_user")
  await Password.click()
  await Password.fill("secret_sauce")
  await LoginButton.click()
  await page.waitForTimeout(5000);
});


