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
        this.alertMessage = page.locator('div.page.messages');
        this.alertContainer = page.locator('div.message-success.success.message');
        this.emailErrorMessage = page.locator("#email-error");
        this.checkoutButton = page.locator('ul.checkout.methods.items.checkout-methods-items button.action.primary.checkout');
        this.firstNameInput = page.locator('.input-text[name="firstname"]');
        this.lastNameInput = page.locator('.input-text[name="lastname"]');
        this.companyInput = page.locator('.input-text[name="company"]');
        this.address1Input = page.locator('.input-text[name="street[0]"]');
        this.address2Input = page.locator('.input-text[name="street[1]"]');
        this.address3Input = page.locator('.input-text[name="street[2]"]');
        this.cityInput = page.locator('.input-text[name="city"]');
        this.stateSelector = page.locator('form select[name="region_id"]');
        this.postcodeInput = page.locator('.input-text[name="postcode"]');
        this.countrySelector = page.locator();
        this.phoneInput = page.locator('.input-text[name="telephone"]');
        this.radio1Button = page.locator('input[type="radio"][name="ko_unique_1"]');
        this.radio2Button = page.locator('input[type="radio"][name="ko_unique_2"]');
    }

    async selectElement() {
        const itemCount = await this.page.locator('ol.product-items.widget-product-grid > li').count();
        const randomValue = Math.floor(Math.random() * itemCount)+1;
        // this.productItem = this.page.locator(`li:nth-child(${randomValue}) div.product-item-info > a`);
        this.productItem = this.page.locator(`li:nth-child(2) div.product-item-info > a`);

        await this.productItem.click();
        await this.page.waitForSelector('div.breadcrumbs > ul > li.item.product', { visible: true } );
    }

    async selectColorSize(){
        if (this.page.locator(this.alertMessage, {isVisible: true})){
            await this.selectSizeRandom()
            await this.selectRandomColor();
        }
        else{
            await this.addingtoCar();
        }
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
    
    async gotoCart(){
        this.cartLink.click();
        await expect(this.page).toHaveURL(/.*cart/);
        await expect(this.page).toHaveTitle("Shopping Cart");
    }

    async checkingCart() {
        await this.checkoutButton.click();
        await expect(this.page).toHaveURL(/.*checkout*/);
        await this.page.waitForSelector('#shipping.checkout-shipping-address', { timeout: 45000 });
        await expect(this.page.locator('#shipping div.step-title')).toHaveText('Shipping Address');
    }

    async fillFirstName(firstName) {
        await this.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName) {
        await this.lastNameInput.fill(lastName);
    }
    async fillCompanyInput(company){
        await this.companyInput.fill(company);
    }

    async fillAddress(address1, address2, address3) {
        await this.address1Input.fill(address1);
        await this.address2Input.fill(address2);
        await this.address3Input.fill(address3);
    }

    async fillCity(city){
        await this.cityInput.fill(city);
    }

    async selectState(){
        const stateSelect = this.page.locator('select[name="region_id"]');
        await stateSelect.selectOption('2'); // Selects "Alaska" (value="2")

    }

    async fillPostCode(postcode){
        await this.postcodeInput.fill(postcode);
    }

    async selectCountry(){
        // await this.countrySelector.click();
        const countrySelect = this.page.locator('select[name="country_id"]');
        await countrySelect.selectOption('US'); // Selects "United States" (value="US")
    }

    async fillPhone(){
        await this.phoneInput.fill('561-923-1232');

    }

    async checkRadioButton(){
        await this.radio1Button.click();
    }

    async completeForm(firstName, lastName, address1, address2, address3, city, postCode){
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillAddress(address1, address2, address3);
        await this.fillCity(city);
        await this.selectState();
        await this.fillPostCode(postCode);
        await this.selectCountry();
        await this.fillPhone();
        await this.checkRadioButton();
    }

}

export default ProductCarPage;