// Test that the DemoQA webtables page loads and displays the correct with search and add button
import { test, expect } from '@playwright/test';

// test('should load the webtables page and display the correct elements', async ({ page }) => {
//   // Navigate to the DemoQA webtables page
//   await page.goto('https://demoqa.com/webtables');

//   // Check that the page title is correct
//   await expect(page).toHaveTitle('ToolsQA');

//   // Check that the search box is visible
//   const searchBox = page.locator('#searchBox'); // #searchBox is the id of the search and type is text
//   await expect(searchBox).toBeVisible();

//   // Check that the add button is visible
//   const addButton = page.locator('#addNewRecordButton');
//   await expect(addButton).toBeVisible();
// });


// fixing with no copilot
test.describe('DemoQA Webtables Page', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://demoqa.com/webtables');
    })
    // Verification of title
    test('DemoQA Webtable title is given correctly', async ({page}) => {
        await expect(page.getByRole('heading', {name: 'Web Tables'})).toBeVisible();
    })
    test('Search box is visible and the button of the search button works as well', async({page}) => {
        await page.getByPlaceholder('Type to search').fill('Cierra')
        await page.locator('#basic-addon2').click();
        // expect to see the table value
        await expect(page.getByRole('cell', {name: 'Cierra', exact: true})).toBeVisible();
        await expect(page.getByRole('cell', {name: 'Vega', exact: true})).toBeVisible();
        await expect(page.getByRole('cell', {name: '39', exact: true})).toBeVisible();
        await expect(page.getByRole('cell', {name: 'cierra@example.com', exact: true})).toBeVisible();
    })
    test('Add button and registration form is working correctly', async ({ page }) => {
        // click the add button
        await page.locator('#addNewRecordButton').click();
        // should see registration form
        await expect(page.locator('#registration-form-modal').getByText('Registration Form')).toBeVisible();
        // Fill in luckily there is place holder
        await page.getByPlaceholder('First Name').fill('Jane');
        await page.getByPlaceholder('Last Name').fill('Doe');
        await page.getByPlaceholder('name@example.com').fill('jdoe@example.com');
        await page.getByPlaceholder('Age').fill('20');
        await page.getByPlaceholder('Salary').fill('30000');
        await page.getByPlaceholder('Department').fill('Example Dept');
        // add button
        await page.locator('#submit').click();
        // now see if the text are present
        await expect(page.getByRole('cell', {name: 'Jane', exact: true})).toBeVisible();
        await expect(page.getByRole('cell', {name: 'Doe', exact: true})).toBeVisible();
        await expect(page.getByRole('cell', {name: 'jdoe@example.com', exact: true})).toBeVisible();
        await expect(page.getByRole('cell', {name: '20', exact: true})).toBeVisible();
        await expect(page.getByRole('cell', {name: '30000', exact: true})).toBeVisible();
        await expect(page.getByRole('cell', {name: 'Example Dept', exact: true})).toBeVisible();
    })
    // drop down button
    test('drop down button is working', async({ page }) => {
        // await page.selectOption('select#form-control', ['show 10', 'show 20', 'show 30', 'show 40', 'show 50']);
        await page.getByRole('combobox').selectOption(['Show 10', 'Show 20', 'Show 30', 'Show 40', 'Show 50']); // seen as a combobox in error-context.md
    })
})


// Copilot Provided Code:
// 1. Website [Done manually]
// 2. Verifying the title is correct which is not the right target because it should be Web Tables not ToolsQA [Done manually]
// 3. Search box is visible but did not add the basic-addon2 button which is the search button [Done manually]
// 4. add button is visible but did not take in mind the registration form that pops up when you click the add button and the fact that it has a close button and a submit button, so we need to test those as well [Done Manually]
// 5. doesnt have show dropdown button


// Manual Testing of Website
// the edit button and delete button do not work
// the first, previous, next, last is disabled according to error-context.md

// npx playwright test copilot-webtables.spec.ts