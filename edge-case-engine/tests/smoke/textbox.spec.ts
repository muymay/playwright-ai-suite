import { test, expect } from '@playwright/test';

/**
 * Feature: Text Box Form
 * Acceptance Criteria:
 * 1. User fills in Full Name, Email, Current Address, and Permanent Address fields.
 * 2. User clicks the Submit button.
 * 3. The form displays the entered information correctly.
 */

test('text box form displays submitted data correctly', async ({ page }) => {
    // Navigate to the Text Box page
    await page.goto('https://demoqa.com/text-box');
    // Locate first with PlaceHolder 
    await expect(page.getByRole('heading', { name: 'Text Box' })).toBeVisible(); // verify the heading is visible
    // fill in the form fields with the specified data
    await page.getByPlaceholder('Full Name').fill('John Doe');
    await page.getByPlaceholder('name@example.com').fill('johndoe@example.com');
    await page.getByPlaceholder('Current Address').fill('123 Main St, Anytown, USA');
    await page.locator('#permanentAddress').fill('456 Elm St, Othertown, USA'); // this is the text area id
    // check if there is a submit button
    await page.getByRole('button', { name: /Submit/ }).click();
    // verify if information is then displayed 
    await expect(page.getByText('Name:John Doe')).toBeVisible();
    await expect(page.getByText('Email:johndoe@example.com')).toBeVisible();
    await expect(page.getByText('Current Address :123 Main St, Anytown, USA')).toBeVisible();
    await expect(page.getByText('Permananet Address :456 Elm St, Othertown, USA')).toBeVisible();
});

// npx playwright test textbox.spec.ts