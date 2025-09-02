import { test, expect } from '@playwright/test';

test('Example Domain', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
});

test('Search in YouTube', async ({ page }) => {
  // Ir a www.youtube.com
  await page.goto('https://www.youtube.com');

  // Esperar a que la barra de búsqueda sea visible
  const searchInput = page.getByPlaceholder('Buscar');
  await expect(searchInput).toBeVisible();

  // Buscar el texto "Lionel Messi"
  await searchInput.fill('Lionel Messi');

  // Click en el botón de lupa junto a la barra de búsqueda
  const searchButton = page.locator('button#search-icon-legacy');
  await searchButton.click();
});

test('Full Form', async ({ page }) => {
  // Ir a la página del formulario
  await page.goto('https://testpages.herokuapp.com/styled/basic-html-form-test.html');

  // Esperar a que todos los elementos estén visibles
  const form = page.locator('#HTMLFormElements');
  await expect(form).toBeVisible();

  // Verificar que el h1 tenga el texto correcto
  const h1 = page.locator('h1');
  await expect(h1).toHaveText('Basic HTML Form Example');

  // Llenar los campos
  await page.locator('input[name="username"]').fill('juanlopera');
  await page.locator('input[name="password"]').fill('123456');
  await page.locator('textarea[name="comments"]').fill('Comment test');

  // Check y uncheck los checkboxes
  await page.locator('input[value="cb1"]').check();
  await page.locator('input[value="cb3"]').uncheck();

  // Seleccionar radiobutton
  await page.locator('input[value="rd3"]').check();

  // Seleccionar opción 'ms2' en el select múltiple
  await page.locator('select[multiple="multiple"]').selectOption('ms2');

  // Seleccionar opción 'dd2' en el picklist
  await page.locator('select[name="dropdown"]').selectOption('dd2');

  // Click en el botón 'Submit'
  await page.getByRole('button', { name: 'Submit' }).click();

  // Verificar el nuevo h1
  const h1Processed = page.locator('h1');
  await expect(h1Processed).toHaveText('Processed Form Details');

  // Verificar el <p> contiene el texto esperado
  const p = page.locator('.explanation');
  await expect(p).toContainText('You submitted a form. The details below show the values you entered for processing.');
});



