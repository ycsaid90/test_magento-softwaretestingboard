import { test } from '@playwright/test';
import SignInPage from '../pages/sign-in';
import * as dotenv from 'dotenv';



dotenv.config(); // Load environment variables from .env

const email = process.env.USERNAME!;
const password = process.env.PASSWORD!;

let signInPage: SignInPage;

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/customer/account/login');
    signInPage = new SignInPage(page);
});

test.describe('magento.softwaretestingboard.com - Sign In', () => {
    test('successfull login', async () => {
        await signInPage.doLogin(email, password);
        await signInPage.checkLoggedIn();
    })

    test('failed login - invalid password ', async() => {
        await signInPage.doLogin(email, 'wrong password!');
        await signInPage.checkInvalidLogin();
    })
})