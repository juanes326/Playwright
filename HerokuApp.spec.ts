import { test, expect, Page } from '@playwright/test';
import { executionAsyncId } from 'async_hooks';
import { info, timeLog } from 'console';
import path from 'path';


test('Dropdown', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/dropdown')

  const dropdown = page.locator('#dropdown')
  await expect(dropdown).toBeVisible()

  await dropdown.selectOption('2')
  await expect(dropdown).toHaveValue('2')
  const selectedText = await dropdown.locator('option:checked').innerText()
  console.log('The item is: ', selectedText)
});

test('Checkboxes', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/checkboxes')

  const checkboxes = page.locator('input[type="checkbox"]')
 
  await expect(checkboxes.nth(1)).toBeChecked()
  await expect(checkboxes.nth(2)).not.toBeChecked
  });

  test('Text validation', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1')

  await page.getByRole('button', {name:'Start'}).click()
  const Text = page.locator('#finish h4')
  await expect(Text).toHaveText("Hello World!")
  });

  test('Title validation', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/')

  const Title = await page.title()
  expect(Title).toBe("The Internet")
  });

  test('Link text validation', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/')

  const TextLink = page.getByRole('link', {name: 'A/B Testing'})
  await expect(TextLink).toHaveText("A/B Testing")

  await TextLink.click()
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/abtest')
  const Title = page.locator('.example h3')//CSS Class and child
  await expect(Title).toBeVisible()
  });

  test('Disabled button', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/dynamic_controls')

  const DisabledTextbox = page.locator('input[type="text"]')
  await expect(DisabledTextbox).toBeDisabled()

  const EnableButton = page.getByRole('button', {name: 'Enable'})
  await expect(EnableButton).toBeEnabled()
  await EnableButton.click()
  await expect(DisabledTextbox).toBeVisible()
  await DisabledTextbox.fill("Test")
  await page.waitForTimeout(2000)    
  });

  test('JavaScript Alert', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/javascript_alerts')

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe("I am a JS Alert")
    await dialog.accept()
    });
    await page.getByRole('button', {name: 'Click for JS Alert'}).click()
    await page.waitForTimeout(2000)
    const Result = page.locator('#result')
    await expect(Result).toHaveText("You successfully clicked an alert") 
  });

  test('JavaScript Confirm', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/javascript_alerts')

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe("I am a JS Confirm")
    await dialog.dismiss()
    });
    await page.getByRole('button', {name: 'Click for JS Confirm'}).click()
    await page.waitForTimeout(2000)
    const Result = page.locator('#result')
    await expect(Result).toHaveText("You clicked: Cancel")
  });

  test('JavaScript Prompt', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/javascript_alerts')

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe("I am a JS prompt")
    await dialog.accept('Playwright Test')
    });
    await page.getByRole('button', {name: 'Click for JS Prompt'}).click()
    await page.waitForTimeout(2000)
    const Result = page.locator('#result')
    await expect(Result).toHaveText("You entered: Playwright Test")
  });

  test('Selenium Form', async ({ page }) => {
    
    await page.goto('https://www.selenium.dev/selenium/web/web-form.html')
    await page.getByRole('textbox', {name: 'Text input'}).fill('Test')
    await page.getByRole('textbox', {name: 'Password'}).fill('password123')
    await page.getByRole('combobox', {name: 'Dropdown (select)'}).selectOption('Two')
    const DefaultCheckbox = page.locator('input[id="my-check-1"]')
    await expect(DefaultCheckbox).toBeChecked()
    await page.getByRole('button', {name: 'Submit'}).click()
    const Heading = page.locator('.display-6')
    await expect(Heading).toHaveText("Form submitted")
    await page.waitForTimeout(2000)
  });

  test('Rows from a table', async ({ page }) => {
    
    await page.goto('https://datatables.net/examples/data_sources/dom.html')

    await page.getByRole('searchbox', {name: 'Search:'}).fill('London')

    const Rows = await page.locator('#example tbody tr').all()
    
    for(let row of Rows){
        const Cell = row.locator('td').nth(2)
        const Text = await Cell.innerText()
        expect(Text).toContain('London')
    }
  });

  test('Filters from a table', async ({ page }) => {
  await page.goto('https://datatables.net/examples/data_sources/dom.html');

  await page.getByRole('searchbox', { name: 'Search:' }).fill('London');

  const rows = await page.locator('#example tbody tr').all();
  const generalInfo: Info[] = [];

  for (let row of rows) {
    const name = await row.locator('td').nth(0).innerText();
    const position = await row.locator('td').nth(1).innerText();
    const office = await row.locator('td').nth(2).innerText();
    const age = await row.locator('td').nth(3).innerText();
    const startdate = await row.locator('td').nth(4).innerText();
    const salaryText = await row.locator('td').nth(5).innerText();
    const salaryNumber = Number(salaryText.replace(/[$,]/g, ''));

    if (office === 'London' && salaryNumber > 200000) {
      const info: Info = {
        name,
        position,
        office,
        age,
        startdate,
        salary: salaryText
      };
      generalInfo.push(info);
    }
  }

  for (let result of generalInfo) {
    console.log(result.name, result.office, result.salary);
  }

  interface Info {
    name: string;
    position: string;
    office: string;
    age: string;
    startdate: string;
    salary: string;
  }
});

 test('Several buttons', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dynamic_controls');

  const checkbox = page.locator('#checkbox input[type="checkbox"]');
  const message  = page.locator('#message');
  const loading  = page.locator('#loading');

  // 1) Remove
  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(loading).toBeVisible();    // spinner aparece
  await expect(loading).toBeHidden();     // espera a que desaparezca
  await expect(checkbox).toBeHidden();    // ahora el checkbox ya no existe
  await expect(message).toHaveText("It's gone!");

  // 2) Add
  const addButton = page.getByRole('button', { name: 'Add' });
  await expect(addButton).toBeVisible();
  await addButton.click();

  await expect(loading).toBeVisible();    // espera el spinner de nuevo
  await expect(loading).toBeHidden();     // hasta que desaparezca

  await expect(checkbox).toBeVisible();   // ahora sí el checkbox reaparece
  await expect(message).toHaveText("It's back!");  // con await en la aserción
});

  test('Upload a file', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/upload');

    const ChooseFileButton = page.locator('input[id="file-upload"]');
    const UploadButton = page.getByRole('button', { name: 'Upload' });
    const Message = page.locator('#uploaded-files');
    const Path = path.resolve('tests', 'Uploads', 'test.txt');

    await page.setInputFiles('input[id="file-upload"]', Path);

    await UploadButton.click();
    await expect(Message).toHaveText("test.txt");
  });

  test('Complete Form', async ({ page }) => {

    await page.goto('https://testpages.herokuapp.com/styled/basic-html-form-test.html');

    const Title = await page.title()
    expect(Title).toBe("HTML Form Elements")

    const Form = page.locator('#HTMLFormElements')
    await expect(Form).toBeVisible()

    const Username = page.locator('input[name="username"]')
    await Username.fill("juanlopera")

    const Password = page.locator('input[name="password"]')
    await Password.fill("123456")

    const Comments = page.locator('textarea[name="comments"]')
    await Comments.fill("Este es un comentario de prueba.")

    const Path = path.resolve('tests', 'Uploads', 'test.txt');
    await page.setInputFiles('input[name="filename"]', Path);

    const Checkbox1 = page.locator('input[value="cb1"]')
    await Checkbox1.check()

    const Checkbox3 = page.locator('input[value="cb3"]')
    await Checkbox3.check()

    const Radiobutton = page.locator('input[value="rd3"]')
    await Radiobutton.check()

    const Dropdown = page.locator('select[name="dropdown"]')
    await Dropdown.selectOption('dd2')

    await page.waitForTimeout(2000)

    const Submit = page.locator('input[type="submit"]')
    await Submit.click()

    await expect(page).toHaveURL('https://testpages.herokuapp.com/styled/the_form_processor.php')

    const ResultUsername = page.locator('#_username li')
    await expect(ResultUsername).toHaveText("juanlopera")

    await page.waitForTimeout(2000) 

   });

   test('Complete Form - Custom Steps', async ({ page }) => {
  // Go to the form page
  await page.goto('https://testpages.herokuapp.com/styled/basic-html-form-test.html');

  // Wait for all elements to be displayed
  const form = page.locator('#HTMLFormElements');
  await expect(form).toBeVisible();

  // Verify h1 has the text 'Basic HTML Form Example'
  const h1 = page.locator('h1');
  await expect(h1).toHaveText('Basic HTML Form Example');

  // Set 'juanlopera' in the username field
  const username = page.locator('input[name="username"]');
  await username.fill('juanlopera');

  // Set '123456' in the password field
  const password = page.locator('input[name="password"]');
  await password.fill('123456');

  // Set 'Comment test' in the comments field (by placeholder)
  const comments = page.locator('textarea[placeholder="Comments..."]');
  await comments.fill('Comment test');

  // Check the checkbox with value 'cb1'
  const checkbox1 = page.locator('input[value="cb1"]');
  await checkbox1.check();

  // Uncheck the checkbox with value 'cb3'
  const checkbox3 = page.locator('input[value="cb3"]');
  await checkbox3.uncheck();

  // Select the radiobutton with value 'rd3'
  const radiobutton = page.locator('input[value="rd3"]');
  await radiobutton.check();

  // Select the option 'dd2' from the dropdown
  const dropdown = page.locator('select[name="dropdown"]');
  await dropdown.selectOption('dd2');

  // Optionally, add assertions or submit the form if needed
});