const { BasePage } = require('./Base.page');

export class CheckoutStepOnePage extends BasePage {
    constructor(page) {
        super(page);
        this.firstName = this.page.locator('#first-name');
        this.lastName = this.page.locator('#last-name');
        this.zipCode = this.page.locator('#postal-code');
        this.continueBtn = this.page.locator('#continue');
    }

    async fillFormWithDataAndSubmit(firstName, lastName, zipCode) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.zipCode.fill(zipCode);
        await this.continueBtn.click();
    }
}
