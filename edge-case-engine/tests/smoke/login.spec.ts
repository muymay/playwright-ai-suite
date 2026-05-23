import { test, expect } from '@playwright/test';

// Practing of making test as isolated as possible
// This will be the test before registration it should fail
// Negative working Test Section
test('login should fail before registration', async({ page }) => {
    await page.goto('https://demoqa.com/login');
    // Check if the right login page
    await expect(page.getByRole('heading', { name: 'Login', exact:true })).toBeVisible();
    // check text header since it contains Welcome [h2] Login in Book Store [h5]
    await expect(page.getByRole('heading', { name: 'Welcome'})).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Login in Book Store'})).toBeVisible();
    await page.getByPlaceholder('UserName').fill('mlaiz');
    await page.getByPlaceholder('Password').fill('070703');
    await page.getByRole('button', { name: /Login/ }).click();
    // Should be failure since user should not exist yet
    await expect(page.getByText('Invalid username or password!')).toBeVisible();
})

// // registration and back to login
// test('login form user registration', async({ page }) => {
//     // Registration side
//     await page.goto('https://demoqa.com/register');
//     await expect(page.getByRole('heading', { name: 'Register', exact: true })).toBeVisible();
//     await expect(page.getByRole('heading', { name: 'Register to Book Store'})).toBeVisible();
//     await page.getByPlaceholder('First Name').fill('Jane');
//     await page.getByPlaceholder('Last Name').fill('Doe');
//     await page.getByPlaceholder('UserName').fill('jdoe');
//     await page.getByPlaceholder('Password').fill('secret');
//     await page.getByRole('button', { name: /Register/ }).click();
//     await expect (page.getByText('Please verify reCaptcha to register!')).toBeVisible();
//     // ReCaptcha: https://pypi.org/project/playwright-recaptcha/
//     /** reCaptcha - deliberately untestable by automation
//      * Use test environment that disables reCaptcha
//      */
// })

// Postive working test section
test ('login should pass for registration', async({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await expect(page.getByRole('heading', {name: 'Test login', exact: true})).toBeVisible();
    //await page.locator('username').fill('student');
    await page.getByRole('textbox', {name: 'username'}).fill('student');
    //await page.locator('password').fill('Password123');
    await page.getByRole('textbox', {name: 'password'}).fill('Password123');
    await page.getByRole('button', {name: /Submit/, exact: true}).click();
    await expect(page.getByText('Logged In Successfully')).toBeVisible();
    // not a button but a link  link "Log out" [ref=e41] [cursor=pointer]:
        //     - /url: https://practicetestautomation.com/practice-test-login/
        //   - paragraph
        // got stuck here thinking it was a logout button
    await page.getByRole('link', {name: /Log out/, exact: true}).click();
})


// npx playwright test login.spec.ts
