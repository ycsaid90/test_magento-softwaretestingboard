import { test } from '@playwright/test';
import SignInPage from '../pages/sign-in';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde .env

const email = process.env.USERNAME;
const password = process.env.PASSWORD;

let signInPage;

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/customer/account/login');
    signInPage = new SignInPage(page);
});

test.describe('magento.softwaretestingboard.com - Sign In', () => {
    test('successful login', async () => {
        await signInPage.doLogin(email, password);
        await signInPage.checkLoggedIn();
    });

    test('failed login - invalid password', async () => {
        await signInPage.doLogin(email, 'wrong password!');
        await signInPage.checkInvalidLogin();
    });
});
