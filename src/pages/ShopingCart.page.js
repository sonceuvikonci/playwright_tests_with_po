const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class ShopingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    allItemsInCart = [];

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    checkoutBtnSelector = '[id^="checkout"]';

    get headerTitle() { return this.page.locator('.title'); }

    get cartItems() { return this.page.locator(this.cartItemSelector); }

    // async below added to show the function returns a promise
    async getCartItemByName(name) { return this.page.locator(this.cartItemSelector, { hasText: name }); }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.locator(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems.nth(id).locator(this.removeItemSelector).click();
    }

    async getAllItemsInCart() {
        this.allItemsInCart = await this.collectAllProductToList();
    }

    async clickCheckoutBtn() {
        return this.page.locator(this.checkoutBtnSelector).click();
    }
}
