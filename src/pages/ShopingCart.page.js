const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class ShopingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    checkoutBtnSelector = '[id^="checkout"]';

    get headerTitle() { return this.page.locator('.title'); }

    get cartItems() { return this.page.locator(this.cartItemSelector); }

    inventoryItemName = '.inventory_item_name';

    inventoryItemDescription = '.inventory_item_desc';

    inventoryItemPrice = '.inventory_item_price';

    // async below added to show the function returns a promise
    async getCartItemByName(name) { return this.page.locator(this.cartItemSelector, { hasText: name }); }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.locator(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems.nth(id).locator(this.removeItemSelector).click();
    }

    async getAllItemsAddedToCart() {
        const items = this.page.locator(this.cartItemSelector);
        const itemsCount = await items.count();
        const allItems = [];
        for (let i = 0; i < itemsCount; i += 1) {
            allItems.push(
                {
                    name: await items.nth(i).locator(this.inventoryItemName).textContent(),
                    description: await items.nth(i).locator(this.inventoryItemDescription).textContent(),
                    price: await items.nth(i).locator(this.inventoryItemPrice).textContent(),
                },
            );
        }
        return allItems;
    }

    async getTotalPriceItemsAddedToCart() {
        const prices = await this.page.locator(this.inventoryItemPrice).allTextContents();
        const parsedCalcPrices = prices.map((price) => parseFloat(price.replace('$', '').trim()));
        return parsedCalcPrices.reduce((sum, price) => sum + price, 0);
    }

    async goToCheckoutStep() {
        return this.page.locator(this.checkoutBtnSelector).click();
    }
}
