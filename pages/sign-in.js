import { page, test, expect } from '@playwright/test';

class SignInPage {
    constructor(page) {
        this.page = page;
        this.email = page.locator('input#email');
        this.password = page.locator("[name='login[password]']");
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
        this.alertMessage = page.locator(".message-error > div");
        this.emailErrorMessage = page.locator("#email-error");
    }

    async fillEmail(email) {
        await this.email.fill(email);
    }

    async fillPassword(password) {
        await this.password.fill(password);
    }

    async doLogin(email, password) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.signInButton.click();
    }

    async checkLoggedIn() {
        await expect(this.page).toHaveURL(/.*account/);
        await expect(this.page).toHaveTitle("My Account");
    }

    async checkInvalidLogin() {
        const errorMessage = await this.alertMessage.textContent();
        console.log('Error Message is:', errorMessage);
        await expect(errorMessage.includes("The account sign-in was incorrect")).toBeTruthy();
        await expect(this.alertMessage).toContainText('The account sign-in was incorrect');
        await expect(this.page).toHaveTitle("Customer Login");
    }
}

export default SignInPage;
