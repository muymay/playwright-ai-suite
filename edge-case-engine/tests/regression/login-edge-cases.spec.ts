import {expect, test} from '@playwright/test';

test.describe('Login Edge Cases Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://practicetestautomation.com/practice-test-login/'); // Replace with actual login URL
    });
    // Test 1 - white space username and password
    test('white space username and password', async ({ page }) => {
        await page.fill('#username', '   ');
        await page.fill('#password', '   ');
        await page.click('#submit');
        await expect(page.locator('#error')).toHaveText('Your username is invalid!'); // Assuming the error message is the same for both cases, if not, adjust accordingly
    });
    // Test 2 - wrong password
    test('wrong password', async ({ page }) => {
        await page.fill('#username', 'student'); // Replace with actual correct username
        await page.fill('#password', 'wrongpassword');
        await page.click('#submit');
        await expect(page.locator('#error')).toHaveText('Your password is invalid!'); // Assuming the error message is the same for both cases, if not, adjust accordingly
    });
});
// npx playwright test login-edge-cases.spec.ts