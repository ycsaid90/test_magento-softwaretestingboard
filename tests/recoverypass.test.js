import { test, expect } from '@playwright/test';
import SignInPage from '../pages/sign-in';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde .env

const email = process.env.USERNAME;
const url = process.env.URL;
let signInPage;

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
    await page.goto(url);
    signInPage = new SignInPage(page);
});

test.describe('magento.softwaretestingboard.com - RecoveryPassword', () => {
    test('Recovery Password', async ({ page }) => {
        const forgot = await page.locator('a.action.remind');
        forgot.click();
        await expect(page).toHaveURL(/.*forgotpassword/);
        await expect(page).toHaveTitle('Forgot Your Password?')
        const emailfield = await page.locator('#email_address')
        emailfield.click();
        await emailfield.fill(email);
        await page.locator('#form-validate > div > div.primary > button').click();
    });
})