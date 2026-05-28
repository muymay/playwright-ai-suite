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

4. Radio Button [May 24, 2026]

Built: radio button regression test
Learned: .isVisible() without expect is silent - always wrap with expect to get feedback on the test results. locator(#id) is mroe specific than getByRole and getByText so it should be used when there are multiple elements with the same role or text in the page.
Bug: getByRole for radio buttons with custom ids
Fixed: used locator, and inspected the element to find the id of noradio is already disabled itself so no need to check for that.

5. Dropdown [May 25, 2026]

Build: dropdown regression test covering 4 dropdown types
Learned: selectOption only works on native `<select>` elements, for custom dropdowns, thus using the outline `page.locator('[parent]').getByRole('option', { name: 'Green' })`. Multiselect requires scoping to parent listbox container stritct mode violation solved by scoping the parent container. Always inspect the elemnt to understand its structure
Bug: `getByRole('option')` for custom dropdowns, matched two elements the first dropdown
Fixed: scoped the locator.


6. Full suite, fix what breaks [May 25, 2026]
npx playwright test
output: 
`Running 7 tests using 5 workers`
  `✓  1 …io.spec.ts:15:5 › radio button confirms regression testing output correctly (10.0s)`
  `✓  2 example.spec.ts:8:5 › homepage has correct title (929ms)`
  `✓  3 dropdown.spec.ts:3:5 › dropdown produces the correct output (13.7s)`
  `✓  4 login.spec.ts:6:5 › login should fail before registration (14.1s)`
  `✓  5 checkbox.spec.ts:30:5 › checkbox form confirms outputs correctly (5.5s)`
  `✓  6 textbox.spec.ts:11:5 › text box form displays submitted data correctly (13.5s)`
  `✓  7 login.spec.ts:39:5 › login should pass for registration (3.1s)`

  `7 passed (17.7s)`

Learned: parallel workers run test simultaneously, thats why 7 tests in 17s test isolation means order doesn't matter a clean full suite run is the best way to test the stability of the tests and catch any broken tests after changes. Always run the full suite after making changes to catch any broken tests.

Reading Documentation for this Phase:
1. https://playwright.dev/docs/writing-tests
2. https://playwright.dev/docs/locators
3. https://playwright.dev/docs/test-assertions
4. https://playwright.dev/docs/best-practices
5. https://playwright.dev/docs/input

**Phase 3: Test Organization and Maintenance with Copilot**

First test with Copilot: https://demoqa.com/buttons [May 25, 2026]
Built: buttons page test working with copilot [focused on debugging and understanding the code generated by copilot]
Copilot got wrong:
  - .main-header locator didn't exist on the page
  - test name said "click me" but targeted double click button
  - `page.click()` twice is not the same as `dblclick()`
  - chained `getByRole('paragraph')` inside `#doubleClickMessage` unnecessary
  - `#dynamicClickMessage` id changes on refresh > needed `getByRole()` instead
Fixed and added myself:
  - `getByRole('heading')` instead of .main-header
  - `dblclick()` for double click events
  - simplified assertion to `locator('#doubleClickMessage').toBeVisible()`
  - used `getByRole('button', {name: 'Click Me', exact: true})` for dynamic id

Key lesson: Copilot predicts patterns it does not know your page. Every suggestion needs manual verification before accepting.

Second test with Copilot: https://demoqa.com/webtables [May 26, 2026]
Built: web tables test with copilot [focused on debugging and understanding the code generated by copilot]
Copilot got wrong:
  - targeted page title ToolsQA instead of heading Web Tables
  - found search box but missed the search button #basic-addon2
  - found add button but missed the registration modal entirely
  - missed the rows per page dropdown completely and didn't point out disabled buttons
Fixed and added myself:
  - getByRole('heading') for correct title target
  - added #basic-addon2 click for search execution
  - full registration form fill and row verification
  - combobox selectOption for rows per page dropdown
  - used error-context.md as discovery tool for disabled elements
Key lesson: Copilot can find some elements but miss others, especially if they are not standard or require interaction to appear. Manual exploration of the page is essential to create comprehensive tests.

Third test with Copilot: https://demoqa.com/automation-practice-form [May 27, 2026]
Branch: test/copilot-practice-form

Built: full practice form test all field types covered [kinda]
Copilot got wrong:
  - page.fill() old syntax vs page.locator().fill()
  - keyboard.press('Enter') submitted the form instead of 
    selecting from autocomplete
  - state/city used wrong selectors #state instead of 
    #react-select-3-input
  - missed file upload field entirely still didn't include it in the test

Fixed myself:
  - replaced Enter with .subjects-auto-complete__option click
  - used systematic debug isolation to find exact trigger
  - scoped state/city to react-select inputs and listbox
  
Key lesson: Copilot can generate a lot of code but it may be outdated or not fit the specific page structure. Systematic debugging and isolation of each step is crucial to identify and fix issues in the generated code.

Reading Documentation for this Phase: 
1. https://playwright.dev/docs/codegen
2. https://docs.github.com/en/copilot/quickstart

**Phase 4: AI Edge Case Suggester**

