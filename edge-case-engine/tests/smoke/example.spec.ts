import {test, expect} from '@playwright/test';
// Test is the cotainer for the test and expect is the assertion inside it can have multiple assertion in one test.

/**
 * Async runs asynchronougly, waiting to finish inside the curly bracket that is await to go to the desginated page
 * expect is an assertation that it should have the title of playwright
 */
test('homepage has correct title', async ({page}) => {
    await page.goto('https://playwright.dev/'); 
    await expect(page).toHaveTitle(/Playwright/); // forward dashes - regular expression to match anything containing word in the title
})
