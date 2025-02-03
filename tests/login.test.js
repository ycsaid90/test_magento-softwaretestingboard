import { test } from '@playwright/test';
import SignInPage from '../pages/sign-in';
import dotenv from 'dotenv';

dotenv.config(); // .env var

const email = process.env.USERNAME;
const password = process.env.PASSWORD;
const url = process.env.URL;
let signInPage;

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
    await page.goto(url);
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
