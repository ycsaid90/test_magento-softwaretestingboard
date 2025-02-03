import { test, expect } from '@playwright/test';
import SignInPage from '../pages/sign-in';
import ProductCarPage from '../pages/product-cart';
import dotenv from 'dotenv';
import {address, company, firstName, lastName, phone, city, postCode} from '../utils/random-values';

dotenv.config(); // Cargar variables de entorno desde .env

const email = process.env.USERNAME;
const password = process.env.PASSWORD;
const url = process.env.URL;
let signInPage;

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
    await page.goto(url);
    signInPage = new SignInPage(page);
    await page.locator('div.header.content > a').click();
});

test.describe('magento.softwaretestingboard.com - Add Product to cart', () => {
    test('Adding product in the car', async ({page}) => {
       let productCart = new ProductCarPage(page);
       await productCart.selectElement();
       await productCart.selectColorSize();
       await productCart.addingtoCar();
       await productCart.checkNotification();
       await productCart.gotoCart();
       await productCart.checkingCart();
       await productCart.completeForm(firstName, lastName, company, address, address, address, city, postCode, phone );
       
    })
})
