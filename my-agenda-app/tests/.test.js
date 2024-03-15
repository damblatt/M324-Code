import { expect, test } from '@playwright/test';

test('Empty list when started', async ({ page }) => {
  await page.goto('/');

  const agendaItems = await page.$$('.agenda-item');
  await expect(agendaItems.length).toBe(0);
});

test('Add tasks with enter', async ({ page }) => {
  await page.goto('/');

  const inputField = await page.waitForSelector('.agenda-input');
  await inputField.type('New Task');
  await inputField.press('Enter');

  const agendaItems = await page.$$('.agenda-item');
  await expect(agendaItems.length).toBe(1);
});

test('Removing tasks', async ({ page }) => {
  await page.goto('/');

  const inputField = await page.waitForSelector('.agenda-input');
  await inputField.type('New Task');
  await inputField.press('Enter');

  const removeButton = await page.waitForSelector('.remove-button');
  await removeButton.click();

  const agendaItems = await page.$$('.agenda-item');
  await expect(agendaItems.length).toBe(0);
});
