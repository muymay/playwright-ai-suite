import { test, expect } from '@playwright/test';

// This will be the test before registration
test('login should faild before registration', async({ page }) => {
    await page.goto('https://demoqa.com/login');
    // Check if the right login page
    await expect(page.getByTitle(/Login/));
    // check text header since it contains Welcome [h2] Login in Book Store [h5]
    await expect(page.getByText(/Welcome/)).toBeVisible();
    await expect(page.getByText(/Login in Book Store/)).toBeVisible();
    await page.getByPlaceholder('UserName').fill('mlaiz');
    await page.getByPlaceholder('Password').fill('070703');
    await page.getByRole('button', { name: /Login/ }).click();
    // Should be failure since user should not exist yet
    await expect(page.getByText('Invalid username or password!'));
})

// registration
test('login form user registration', async({ page }) => {
    
})
// after registration

// npx playwright test login.spec.ts
