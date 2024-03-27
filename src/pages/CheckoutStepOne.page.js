const { BasePage } = require('./Base.page');

export class CheckoutStepOnePage extends BasePage {
    get firstName() { return this.page.locator('#first-name'); }

    get lastName() { return this.page.locator('#last-name'); }

    get zipCode() { return this.page.locator('#postal-code'); }

    get continueBtn() { return this.page.locator('#continue'); }


    async fillCheckoutForm(firstName, lastName, zipCode) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.zipCode.fill(zipCode);
        await this.continueBtn.click();
    }
}
