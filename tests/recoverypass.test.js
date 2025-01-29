import { test, expect } from '@playwright/test';
import SignInPage from '../pages/sign-in';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde .env

const email = process.env.USERNAME;

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/customer/account/login');
});

test.describe('magento.softwaretestingboard.com - RecoveryPassword', () => {
    test('Recovery Password', async ({ page }) => {
        const forgot = await page.locator('a.action.remind');
        forgot.click();
        await expect(page).toHaveURL(/.*forgotpassword/);
        await expect(page).toHaveTitle('Forgot Your Password?')
        const email = await page.locator('#email_address')
        email.click();
        await email.fill('email');
        await page.locator('#form-validate > div > div.primary > button').click();
    });
})