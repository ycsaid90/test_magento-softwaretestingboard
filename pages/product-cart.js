import { page, expect } from '@playwright/test';

class ProductCarPage {
    constructor(page) {
        this.page = page;
        this.productList = page.locator('ol.product-items.widget-product-grid > li');
        this.addtocart = page.getByRole('button', { name: 'Add to Cart' });
        this.listBox = page.locator('div[role="listbox"]');
        this.lisBoxSize = page.locator('.swatch-opt div.swatch-attribute.size');
        this.listBoxColor = page.locator('div.swatch-option.color');
        this.cartLink = page.locator('div.message-success.success.message a');
        this.alertContainer = page.locator('div.message-success.success.message');
        this.emailErrorMessage = page.locator("#email-error");
    }

    async selectElement() {
        const itemCount = await this.page.locator('ol.product-items.widget-product-grid > li').count();
        const randomValue = Math.floor(Math.random() * itemCount)+1;
        this.productItem = this.page.locator(`li:nth-child(${randomValue}) div.product-item-info > a`);
        await this.productItem.click();
        await this.page.waitForSelector('div.breadcrumbs > ul > li.item.product', { visible: true } );
    }

    async selectRandomColor() {
        const elements = await this.page.locator('div[role="listbox"] div.swatch-option.color');
        const count = await elements.count();
        const randomIndex = Math.floor(Math.random() * count);
        const randomElement = elements.nth(randomIndex);
        await randomElement.waitFor({ state: 'visible' });
        await randomElement.click();
    }
      
    async selectSizeRandom(){
        const elements = await this.page.locator('div[role="listbox"] div.swatch-option.text');
        const count = await elements.count();
        const randomIndex = Math.floor(Math.random() * count);
        const randomElement = elements.nth(randomIndex);
        await randomElement.waitFor({ state: 'visible' });
        await randomElement.click();
    }

    async addingtoCar() {
       await this.addtocart.click();
    }

    async checkNotification() {
        await expect(this.alertContainer).toBeVisible();
    }

    async checkCart() {
        this.cartLink.click();
        await expect(this.page).toHaveURL(/.*cart/);
        await expect(this.page).toHaveTitle("Shopping Cart");
    }

}

export default ProductCarPage;