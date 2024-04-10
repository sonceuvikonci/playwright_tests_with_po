const { BasePage } = require('./Base.page');

export class BaseSwagLabPage extends BasePage {
    constructor(page) {
        super(page);
        this.shopingCartBadge = this.page.locator('.shopping_cart_badge');
        this.shopingCartLink = this.page.locator('.shopping_cart_link');
        this.items = this.page.locator('.cart_item');
    }

    async openShoppingCart() {
        return this.shopingCartLink.click();
    }

    async getNumberOfItemsInCart() {
        return this.shopingCartBadge.textContent();
    }

    async getItemsList() {
        const itemCardsCount = await this.items.count();
        const items = [];
        for (let i = 0; i < itemCardsCount; i += 1) {
            items.push(
                {
                    name: await this.items.nth(i).locator('.inventory_item_name').textContent(),
                    description: await this.items.nth(i).locator('.inventory_item_desc').textContent(),
                    price: await this.items.nth(i).locator('.inventory_item_price').textContent(),
                },
            );
        }
        return items;
    }
}
