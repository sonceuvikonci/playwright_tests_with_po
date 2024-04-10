const { getRandomUniqueNumbersArray } = require('../Helper');

const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class InventoryPage extends BaseSwagLabPage {
    constructor(page) {
        super(page);
        this.url = '/inventory.html';
        this.inventoryItems = this.page.locator('.inventory_item');
        this.headerTitle = this.page.locator('.title');
        this.selectItems = this.page.locator('select.product_sort_container');
        this.itemPrice = this.page.locator('.inventory_item_price');
        this.itemName = this.page.locator('.inventory_item_name');
    }

    async addItemToCartById(id) {
        await this.inventoryItems.nth(id).locator('[id^="add-to-cart"]').click();
    }

    async addRandomItemsToCart(numberOfItems = 2) {
        const randomItemsIndex = getRandomUniqueNumbersArray(numberOfItems);
        const itemsToAddInCart = [];
        for (let i = 0; i < randomItemsIndex.length; i += 1) {
            itemsToAddInCart.push(
                {
                    name: await this.inventoryItems
                        .nth(randomItemsIndex[i])
                        .locator('.inventory_item_name')
                        .textContent(),
                    description: await this.inventoryItems
                        .nth(randomItemsIndex[i])
                        .locator('.inventory_item_desc')
                        .textContent(),
                    price: await this.inventoryItems
                        .nth(randomItemsIndex[i])
                        .locator('.inventory_item_price')
                        .textContent(),
                },
            );
            await this.addItemToCartById(randomItemsIndex[i]);
        }
        return itemsToAddInCart;
    }

    async sortItemsBy(criteria) {
        await this.selectItems.selectOption(criteria);
        return criteria.includes('Price') ? this.getAllItemPrices() : this.getAllItemNames();
    }

    async getAllItemPrices() {
        const prices = await this.itemPrice.allTextContents();
        return prices.map((element) => parseFloat(element.replace('$', '')));
    }

    async getAllItemNames() {
        return this.itemName.allTextContents();
    }
}
