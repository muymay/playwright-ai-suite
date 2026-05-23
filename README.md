# playwright-ai-suite
**Phase 1: Setup and Configuration**
1. Install Node.js and npm: Ensure you have Node.js and npm installed on your machine. You can download them from [Node.js official website](https://nodejs.org/).
2. Installed node modules - `npm install @playwright/test`
3. Create a configuration file - npx playwright test --init
4. Created a test file in smoke folder 
`npx playwright test smoke/test.spec.ts`

Reading Documentation for this Phase: 
1. https://playwright.dev/docs/intro
2. https://docs.npmjs.com/about-npm

**Phase 2: Writing Tests with AAA Pattern**
Website used in demonstration: demoqa.com
1. Text Box
Concepts covered in this phase: 
    1. `getByPlaceholder` locator
    2. `getByRole` locator
    3. `toBeVisible` assertion

Learned: labels and inputs are different in HTML elements, locator priority sometimes there are sections with no placeholder so finding a different solution is viable such as `page.locator` and always test the website first to understand the structure of the elements and how to locate them. Likewise the spelling of the input fields is not even permanent instead permananet address which makes the test fail so being observant is needed.
Bug: No Placeholder and mispelled output field for permanent address -> permananet address :
Fixed: No Placeholder -> used locator and for mispelled used the actual mispelled word on the locator to make it work.

2. Check Box [May 22, 2026]

Built: checkbox tree expansion test with sibling and parent
Learned: sibling vs child HTML relationships, aria-labels, roles, etc.
Chaining locators withe the getByRole + locator() specifies the element to be located within the parent even with the same locator in the page. Meaning strict mode is not needed when using chaining locators.
Bug: Checkbox tree expansion test was not working because the locator was not specific enough and there were multiple elements with the same locator in the page. 
Fixed: Used chaining locators

3. Login test + First negative test [May 23, 2026]

Built: negative login test + registration [unfinished due to reCaptcha] + positive login test
Learned: exact: true prevents strict mode on partial text matches, reCaptcha is deliberately untestable except with test environment that disables it. Log out was a link not a button thanks to looking at the test results and looking at the snapshot of the erorr it gave me the hint to look over it, so always inspect and look over test results and snapshots to understand the error and how to fix it.
Broken: strict mode on heading locators, logout button assumption
Fixed: exact: true, getByRole('link', {name: /Log out/, exact: true}) instead of button.

5. Radio Button + Dropdown test
6. Full suite, fix what breaks

Reading Documentation for this Phase:
1. playwright.dev/docs/writing-tests
2. playwright.dev/docs/locators
3. https://playwright.dev/docs/test-assertions