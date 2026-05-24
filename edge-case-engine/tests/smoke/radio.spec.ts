import { test, expect } from '@playwright/test';

// Question: Why do the radio button and dropdown tests belong in regression and not smoke?
// Smoke = the most critical paths
//         "does the core product still work?"
//         Run after every deployment
//         Fast, broad, surface level

// Regression = specific behaviors and edge conditions
//              "did anything break that used to work?"
//              Run after any change to existing code
//              Slower, deeper, more detailed
// Three options: yes [works], impressive [works], no [disabled according to inspect element]
// no is in the disabled class
test ('radio button confirms regression testing output correctly', async({ page }) => {
    await page.goto('https://demoqa.com/radio-button');
    await expect(page.getByRole('heading', {name: /Radio Button/, exact: true})).toBeVisible();
    await expect(page.getByRole('generic', {name: 'Do you like the site?', exact: true})).toBeVisible();
    await expect(page.getByRole('radio', {name: 'yesRadio', exact: true})).toBeVisible();
    await expect(page.getByRole('radio', {name: 'impressiveRadio', exact: true})).toBeVisible();
    await expect(page.getByRole('radio', {name: 'noRadio', exact: true})).toBeVisible();
    await page.locator('#yesRadio').check();
    //await page.getByLabel('yesRadio').check();
    await expect(page.getByText('You have selected Yes')).toBeVisible();
    //await page.getByRole('radio', {name: 'impressiveRadio', exact: true}).check;
    await page.locator('#impressiveRadio').check();
    await expect(page.getByText('You have selected Impressive')).toBeVisible();
})

// npx playwright test radio.spec.ts
