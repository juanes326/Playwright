import test, { expect } from "@playwright/test";
import { beforeEach } from "node:test";

test.describe('Testing BeforeEach', () =>{

  const webpage = 'https://the-internet.herokuapp.com/'

  test.beforeEach('Before Each', async ({page}) => {
    await page.goto(webpage)
  })

    test('Title validation', async ({ page }) => {

    const Title = await page.title()
    expect(Title).toBe("The Internet")
    });

    test('Link text validation', async ({ page }) => {

    const TextLink = page.getByRole('link', {name: 'A/B Testing'})
    await expect(TextLink).toHaveText("A/B Testing")

    await TextLink.click()
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/abtest')
    const Title = page.locator('.example h3')//CSS Class and child
    await expect(Title).toBeVisible()
    });
})