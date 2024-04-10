const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class ShopingCartPage extends BaseSwagLabPage {
    constructor(page) {
        super(page);
        this.url = '/cart.html';
        this.removeItem = this.page.locator('[id^="remove"]');
        this.checkoutBtn = this.page.locator('[id^="checkout"]');
        this.itemPrice = this.page.locator('.inventory_item_price');
    }

    async getCartItemByName(name) {
        return this.items.filter({ hasText: name });
    }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.locator(this.removeItem);
    }

    async removeCartItemById(id) {
        await this.items.nth(id).locator(this.removeItem).click();
    }

    async getTotalPriceItemsAddedToCart() {
        const prices = await this.items.allTextContents();
        const parsedCalcPrices = prices.map((price) => parseFloat(price.replace('[^\\d.]', '')));
        return parsedCalcPrices.reduce((sum, price) => sum + price, 0);
    }

    async goToCheckoutStep() {
        return this.checkoutBtn.click();
    }
}
