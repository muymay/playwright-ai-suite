// Test that the DemoQA buttons page loads and the click me button works
import { test, expect } from '@playwright/test';

test.describe('DemoQA Buttons Page', () => { // test.describe is a way to group related tests together, in this case, all tests related to the DemoQA Buttons Page
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/buttons'); // webiste
  }); // before each test, navigate to the buttons page

  test('should load the buttons page', async ({ page }) => { // this passes now 
    // await expect(page.locator('.main-header')).toHaveText('Buttons'); // this line is not working because the header is not visible, it is hidden behind the fixed header, so we need to scroll down to see it
    await expect(page.getByRole('heading', { name: 'Buttons', exact: true })).toBeVisible(); // this line is working because it is using the getByRole method which is more reliable than the locator method, 
    // and it is also using the exact option to ensure that it is looking for the exact text manually added 
  });

  test('should click the double click me button and show the message', async ({ page }) => {
    await page.dblclick('#doubleClickBtn'); // click the double click me button twice 
    // await expect(page.locator('#doubleClickMessage')).toHaveText('You have done a double click'); timeout error because #doubleClickMessage is not visible
    // await expect(page.getByText('You have done a double click')).toBeVisible(); // doesnt work
    await expect(page.locator('#doubleClickMessage')).toBeVisible();
  });

  test('should click the right click me button and show the message', async ({ page }) => {
    await page.click('#rightClickBtn', { button: 'right' }); // right click the right click me button
    await expect(page.locator('#rightClickMessage')).toBeVisible();
  });

  test('should click the click me button and show the message', async ({ page }) => {
    // await page.click('#'); // click the click me button and id is not working because it changes every time you refresh the page, so we need to use a different selector
    await page.getByRole('button', { name: 'Click Me', exact: true }).click(); 
    await expect(page.locator('#dynamicClickMessage')).toBeVisible(); // if you initially press this button other buttons doesnt show up anymore
  });
});
// npx playwright test copilot-test.spec.ts
// Before copilot: features after manually testing the website
// 1. There are three buttons: "Click Me", "Double Click Me", and "Right Click Me".
// 2. There is no Right click me button, and click me button 
// only one click on the double click me button so i would assume it doesnt show the message 