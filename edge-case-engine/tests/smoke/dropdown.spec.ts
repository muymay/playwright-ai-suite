import { test, expect } from '@playwright/test';

test('dropdown produces the correct output', async({ page }) => {
    await page.goto('https://demoqa.com/select-menu');
    await expect(page.getByRole('heading', { name: 'Select Menu', exact: true})).toBeVisible();
    //await page.locator('#withOptGroup').selectOption({label: '#react-select-2-option-3'});
    //       - waiting for locator('#withOptGroup')
    //     - locator resolved to <div id="withOptGroup" class="css-b62m3t-container">…</div>
    //   - attempting select option action
    //     - waiting for element to be visible and enabled [Error]
    await page.getByPlaceholder('Select Option'
})

// npx playwright test dropdown.spec.ts