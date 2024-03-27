require('../globalPrototype');
const { BasePage } = require('./Base.page');

export class BaseSwagLabPage extends BasePage {
    // header
    get mainMenuBtn() { return this.page.locator('TBD'); }

    get shopingCart() { return this.page.locator('.shopping_cart_link'); }

    get shopingCartBadge() { return this.page.locator('.shopping_cart_badge'); }

    async getNumberOfItemsInCart() {
        return this.shopingCartBadge.textContent();
    }

    // product list
    get inventoryItems() { return this.page.locator('.inventory_item'); }

    cartItemSelector = '.cart_item';

    inventoryItemName = '.inventory_item_name';

    inventoryItemDescription = '.inventory_item_desc';

    inventoryItemPrice = '.inventory_item_price';

    async collectAllProductToList() {
        const items = this.page.locator(this.cartItemSelector);
        const itemsCount = await items.count();
        const allItems = [];
        for (let i = 0; i < itemsCount; i += 1) {
            allItems.push(
                {
                    // eslint-disable-next-line no-await-in-loop
                    name: await items.nth(i).locator(this.inventoryItemName).textContent(),
                    // eslint-disable-next-line no-await-in-loop
                    description: await items.nth(i).locator(this.inventoryItemDescription).textContent(),
                    // eslint-disable-next-line no-await-in-loop
                    price: await items.nth(i).locator(this.inventoryItemPrice).textContent(),
                },
            );
        }
        return allItems;
    }

    async collectProductsWithIdsToList(idArr) {
        const allItems = [];
        await idArr.forEachAsync(async (itemId) => {
            allItems.push(
                {
                    id: itemId,
                    name: await this.inventoryItems.nth(itemId)
                        .locator(this.inventoryItemName).textContent(),
                    description: await this.inventoryItems.nth(itemId)
                        .locator(this.inventoryItemDescription).textContent(),
                    price: await this.inventoryItems.nth(itemId)
                        .locator(this.inventoryItemPrice).textContent(),
                },
            );
        });
        return allItems;
    }
}
