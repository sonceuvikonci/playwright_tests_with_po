const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class CheckoutStepTwoPage extends BaseSwagLabPage {
    allItems = [];

    get itemPrice() { return this.page.locator('.inventory_item_price'); }

    get totalPrice() { return this.page.locator('.summary_total_label'); }

    get tax() { return this.page.locator('.summary_tax_label'); }

    async displayedPrice() {
        const totalPrice = await this.totalPrice.textContent();
        return totalPrice.replace('Total: $', '').trim();
    }

    async calculatedPrice() {
        const prices = await this.itemPrice.allTextContents();
        const parsedCalcPrices = prices.map((price) => parseFloat(price.replace('$', '').trim()));
        const pricesSum = parsedCalcPrices.reduce((sum, price) => sum + price, 0);

        const taxValue = await this.tax.textContent();
        const parsedTaxValue = parseFloat(taxValue.replace('Tax: $', '').trim());

        return (pricesSum + parsedTaxValue).toString();
    }

    async allItemsOnChekout() {
        if (this.allItems.leght === 0) {
            this.allItems = await this.collectAllProductToList();
        }
        return this.allItems;
    }
}
