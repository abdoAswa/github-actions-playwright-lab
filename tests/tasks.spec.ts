import { test, expect, type Page } from '@playwright/test';

async function login(page: Page) {
  await page.goto('/');
  await page.getByLabel('Email').fill('qa@example.com');
  await page.getByLabel('Password').fill('Password123!');
  await page.getByRole('button', { name: 'Log in' }).click();
}

test.beforeEach(async ({ page }) => { await login(page); });

test('shows empty task list initially', async ({ page }) => {
  await expect(page.getByText('No tasks yet. Add your first task.')).toBeVisible();
  await expect(page.getByText('0 tasks')).toBeVisible();
});

test('adds a task', async ({ page }) => {
  await page.getByLabel('New task').fill('Test login flow');
  await page.getByRole('button', { name: 'Add task' }).click();
  await expect(page.getByTestId('task-row')).toHaveCount(1);
  await expect(page.getByText('Test login flow')).toBeVisible();
  await expect(page.getByText('1 tasks')).toBeVisible();
});

test('marks task completed', async ({ page }) => {
  await page.getByLabel('New task').fill('Review report');
  await page.getByRole('button', { name: 'Add task' }).click();
  await page.getByRole('checkbox', { name: 'Complete Review report' }).check();
  await expect(page.getByText('1 completed')).toBeVisible();
});

test('deletes task', async ({ page }) => {
  await page.getByLabel('New task').fill('Temporary task');
  await page.getByRole('button', { name: 'Add task' }).click();
  await page.getByRole('button', { name: 'Delete Temporary task' }).click();
  await expect(page.getByTestId('task-row')).toHaveCount(0);
});

test('rejects blank task name', async ({ page }) => {
  await page.getByLabel('New task').fill('   ');
  await page.getByRole('button', { name: 'Add task' }).click();
  await expect(page.getByRole('alert')).toHaveText('Task name is required.');
});
