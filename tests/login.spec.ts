import { test, expect } from '@playwright/test';

test('shows login screen', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'QA Practice Lab' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
});

test('requires email and password', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('alert')).toHaveText('Email and password are required.');
});

test('rejects invalid credentials', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Email').fill('wrong@example.com');
  await page.getByLabel('Password').fill('wrong-password');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('alert')).toHaveText('Invalid email or password.');
});

test('logs in and logs out successfully', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Email').fill('qa@example.com');
  await page.getByLabel('Password').fill('Password123!');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('heading', { name: 'My Tasks' })).toBeVisible();
  await page.getByRole('button', { name: 'Log out' }).click();
  await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
});


test('login page should display Welcome Back', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByText('Welcome Back', { exact: true })
  ).toBeVisible();
});
