import { test, expect } from '@playwright/test';

/**
 * Feature: Checkbox Selection
 * Acceptance Criteria: 
 * - User expands the tree and selects a checkbox
 *      -> Clicking the Home Checkbox Checks all
 *      -> Clicking the Plus Sign
 *          Expands to
 *          -> Desktop
 *              -> Notes
 *              -> Commands
 *          -> Documents
 *              -> Workspace
 *                  -> React
 *                  -> Angular
 *                  -> Veu
 *              -> Office
 *                  -> Public
 *                  -> Private
 *                  -> Classified
 *                  -> General
 *          -> Downloads
 *              ->Word File.doc
 *              ->Excel File.doc
 * - Output confirms which item was selected
 * You have selected : filename subfilenames
 */

test ('checkbox form confirms outputs correctly', async ({ page }) => {
    // go to the corresponding website 
    await page.goto('https://demoqa.com/checkbox');
    // verify title of the page first 
    await expect(page.getByRole( 'heading' , { name: /Check Box/ })).toBeVisible();
    // Click The Plus Sign
    await page.getByTitle('Home').click()
    await page.locator('.rc-tree-switcher').click()
    // verify if all three of the main folders are there
    await expect(page.getByText('Desktop')).toBeVisible();
    await expect(page.getByText('Documents')).toBeVisible();
    await expect(page.getByText('Downloads')).toBeVisible();
    // Going to the Subfolders now
    await page.getByTitle('Desktop').click()
    // go to the parent which is tree item since desktop and name and rc-tree-switcher are siblings
    await page.getByRole('treeitem', { name: 'Desktop'}).locator('.rc-tree-switcher').click();
    await page.getByRole('treeitem', { name: 'Documents'}).locator('.rc-tree-switcher').click();
    await page.getByRole('treeitem', { name: 'Downloads'}).locator('.rc-tree-switcher').click();
    // see if there is any sub files
    await expect(page.getByText('Notes')).toBeVisible();
    await expect(page.getByText('Commands')).toBeVisible();
    await expect(page.getByText('WorkSpace')).toBeVisible();
    await expect(page.getByText('Office')).toBeVisible();
    await expect(page.getByText('Word File.doc')).toBeVisible();
    await expect(page.getByText('Excel File.doc')).toBeVisible();
    // sub folder
    await page.getByRole('treeitem', { name: 'WorkSpace' }).locator('.rc-tree-switcher').click();
    await page.getByRole('treeitem', { name: 'Office' }).locator('.rc-tree-switcher').click();
    // sub sub files
    await expect(page.getByText('React')).toBeVisible();
    await expect(page.getByText('Angular')).toBeVisible();
    await expect(page.getByText('Veu')).toBeVisible();
    await expect(page.getByText('Public')).toBeVisible();
    await expect(page.getByText('Private')).toBeVisible();
    await expect(page.getByText('Classified')).toBeVisible();
    await expect(page.getByText('General')).toBeVisible();
    // Check Box
    await page.getByRole('checkbox', { name: 'Word File.doc' }).check();
    // Verify Output
    await expect(page.getByText('You have selected :wordFile')).toBeVisible();
})

// npx playwright test checkbox.spec.ts