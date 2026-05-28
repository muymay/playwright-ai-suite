    // Test that the DemoQA automation practice form 
    // fills in all fields correctly and submits successfully
    // including text inputs, radio buttons, checkboxes, 
    // date picker, subject search, and dropdown

//     import { test, expect } from '@playwright/test';

// test('should fill in the form and submit successfully', async ({ page }) => {
//     // Navigate to the form page
//     await page.goto('https://demoqa.com/automation-practice-form');

//     await page.evaluate(() => {
//     const modal = document.querySelector('.modal.show');
//     if (modal) modal.remove();
//     }); // Remove the fixed banner and footer that may interfere with element visibility

//     // Fill in text inputs
//     //   await page.fill('#firstName', 'John');
//     //   await page.fill('#lastName', 'Doe');
//     //   await page.fill('#userEmail', '');   // Intentionally left blank to test validation
//     //   await page.fill('#userNumber', '1234567890');
//     //   await page.fill('#currentAddress', '123 Main St, Anytown, USA');
//     await page.getByPlaceholder('First Name').fill('John');
//     await page.getByPlaceholder('Last Name').fill('Doe');
//     await page.getByPlaceholder('name@example.com').fill('');   // Intentionally left blank to test validation
//     await page.getByPlaceholder('Mobile Number').fill('1234567890');
//     await page.getByPlaceholder('Current Address').fill('123 Main St, Anytown, USA');

//     // Select gender
//     await page.click('label[for="gender-radio-1"]'); // Male

//     // Select hobbies
//     await page.click('label[for="hobbies-checkbox-1"]'); // Sports
//     await page.click('label[for="hobbies-checkbox-2"]'); // Reading
//     await page.pause();


//     // Upload picture - no file upload in the code, so skipping this step

//     // Set date of birth
//     await page.click('#dateOfBirthInput');
//     await page.selectOption('.react-datepicker__month-select', '0'); // January
//     await page.selectOption('.react-datepicker__year-select', '1990');
//     await page.click('.react-datepicker__day--001');
//     await page.keyboard.press('Escape'); // close date picker

//     // Fill in subject
//     await page.fill('#subjectsInput', 'Maths');
//     await page.waitForSelector('.subjects-auto-complete__option');
//     await page.keyboard.press('ArrowDown');
//     await page.keyboard.press('Enter');

//     // Select state and city
//     await page.locator('#react-select-3-input').click();
//     await page.locator('#react-select-3-listbox').getByRole('option', {name: 'NCR'}).click();
//     await page.locator('#react-select-4-input').click();
//     await page.locator('#react-select-4-listbox').getByRole('option', {name: 'Delhi'}).click()
//     //   await page.click('#state'); // fails on first test with no edit of code of copilot it is not #state but #react-select-3-input
//     //   await page.click('div[id^="react-select-3-option-0"]'); // NCR
//     //   await page.click('#city');
//     //   await page.click('div[id^="react-select-4-option-0"]'); // Delhi;
//     //   await page.getByRole('combobox', {name: 'Select State'}).click(); // in error-context.md it is seen as a combobox
//     //   await page.getByRole('option', {name: 'NCR'}).click();
//     //   await page.getByRole('combobox', {name: 'Select City'}).click();
//     //   await page.getByRole('option', {name: 'Delhi'}).click();
//     //   await page.locator('#state').getByRole('option', {name: 'NCR', exact: true}).click(); // not input but instead placeholder since that is the parent
//     //   await page.locator('#city').getByRole('option', {name: 'Delhi', exact: true}).click();
//     // Submit the form
//     // await page.locator('#submit').click();
//     await page.getByRole('button', {name: 'Submit', exact: true}).click(); // in error-context.md it is seen as a button

//     // Verify submission success
//     await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');
//     });

    // Manually testing the website if you left everything blank and click submit
    // email passes, date of birth defaults on today's date, hobbies, picture, current address
    // state and city and subject are not required fields
    // First Name, Gender, Mobile Digits are required fields
    // npx playwright test copilot-form.spec.ts
    // no file upload in the code

    import { test, expect } from '@playwright/test';

    test('debug find modal trigger', async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form');

    await page.getByPlaceholder('First Name').fill('John');
    await page.getByPlaceholder('Last Name').fill('Doe');
    await page.getByPlaceholder('Mobile Number').fill('1234567890');
    // await page.click('label[for="gender-radio-1"]');
    // await page.click('label[for="hobbies-checkbox-1"]');
    // await page.click('label[for="hobbies-checkbox-2"]');
    // Date picker added
    await page.click('#dateOfBirthInput');
    await page.selectOption('.react-datepicker__month-select', '0');
    await page.selectOption('.react-datepicker__year-select', '1990');
    await page.click('.react-datepicker__day--001');
    // Subjects added
    await page.fill('#subjectsInput', 'Maths');
    // await page.keyboard.press('ArrowDown');
    // await page.keyboard.press('Enter');
    // await page.locator('#subjectsInput').fill('Maths');
    // await page.waitForSelector('.subjects-auto-complete__menu');
    // await page.locator('.subjects-auto-complete__option').first().click();
    await page.click('label[for="gender-radio-1"]');
    await page.click('label[for="hobbies-checkbox-1"]');
    await page.click('label[for="hobbies-checkbox-2"]');
    await page.locator('#react-select-3-input').click();
    await page.locator('#react-select-3-listbox').getByRole('option', {name: 'NCR'}).click();
    await page.locator('#react-select-4-input').click();
    await page.locator('#react-select-4-listbox').getByRole('option', {name: 'Delhi'}).click();

    // Submit
    await page.getByRole('button', {name: 'Submit', exact: true}).click();

    // Verify success
    await expect(page.locator('#example-modal-sizes-title-lg'))
        .toHaveText('Thanks for submitting the form');
    await page.waitForTimeout(3000);
    });