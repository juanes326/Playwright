import test, { expect } from "@playwright/test"

test('Testing table', async ({ page }) => {
  await page.goto('https://cosmocode.io/automation-practice-webtable/')

  const TableContainer = page.locator("xpath=//table[@id='countries']")
  const Rows = await TableContainer.locator("xpath=.//tr").all()
  const Countries: Country[] = []

  for(let row of Rows){
    let Country: Country = {
        name: await row.locator('xpath=.//td[2]').innerText(),
        capital: await row.locator('xpath=.//td[3]').innerText(),
        currency: await row.locator('xpath=.//td[4]').innerText(),
        language: await row.locator('xpath=.//td[5]').innerText()
    }
    Countries.push(Country)
  }

  for(let pepe of Countries){
    console.log(pepe)
  }

  interface Country{
    name: string
    capital: string
    currency: string
    language: string
  }
})