const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class CheckoutStepTwoPage extends BaseSwagLabPage {
    constructor(page) {
        super(page);
        this.tax = this.page.locator('.summary_tax_label');
        this.totalPrice = this.page.locator('.summary_total_label');
    }

    async getTotalPrice() {
        const totalPriceValue = await this.totalPrice.textContent();
        return parseFloat(totalPriceValue.replace('[^\\d.]', ''));
    }

    async getTax() {
        const taxValue = await this.tax.textContent();
        return parseFloat(taxValue.replace('[^\\d.]', ''));
    }
}
