import { test, expect } from '@playwright/test';

test('dropdown produces the correct output', async({ page }) => {
    await page.goto('https://demoqa.com/select-menu');
    await expect(page.getByRole('heading', { name: 'Select Menu', exact: true})).toBeVisible();
    //await page.locator('#withOptGroup').selectOption({label: '#react-select-2-option-3'});
    //       - waiting for locator('#withOptGroup')
    //     - locator resolved to <div id="withOptGroup" class="css-b62m3t-container">…</div>
    //   - attempting select option action
    //     - waiting for element to be visible and enabled [Error]
    // await page.locator('#react-select-2-plahold').selectOption('A root option');
    // await page.getByPlaceholder('Select Option').locator('#react-select-2-placeholder').selectOption('A root option');
    await page.locator('#react-select-2-input').click();
    // await page.pause();
    await page.getByRole('option', { name: 'A root option' }).click();
    await page.locator('#react-select-3-input').click();
    // await page.pause();
    await page.getByRole('option', { name: 'Mr.' }).click();
    await page.locator('#oldSelectMenu').selectOption('Voilet'); // voilet mispelled in the web
    // multiselect drop down option that doesnt use <select> in inspect element
    await page.locator('#react-select-4-input').click();
    // await page.pause();
    // page.locator('[parent]').getByRole('option', { name: 'Green' })
    await page.locator('#react-select-4-listbox').getByRole('option', {name: 'Green'}).click();
    await page.locator('#react-select-4-listbox').getByRole('option', {name: 'Blue'}).click();
    await page.locator('#react-select-4-listbox').getByRole('option', {name: 'Black'}).click();
    await page.locator('#react-select-4-listbox').getByRole('option', {name: 'Red'}).click();
    // standarad multi select
    await page.locator('#cars').selectOption(['Volvo', 'Saab', 'Opel', 'Audi']);
})

// npx playwright test dropdown.spec.ts
// import { test, expect } from '@playwright/test';

// test('selecting an option displays correct value', async ({ page }) => {
//   await page.goto('https://demoqa.com/select-menu');

//   await page.locator('#oldSelectMenu').selectOption('Blue');

//   await expect(page.locator('#oldSelectMenu')).toHaveValue('1');
// });