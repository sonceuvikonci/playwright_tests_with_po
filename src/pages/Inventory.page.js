const { getRandomUniqueNumbersArray } = require('../Helper');

const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return this.page.locator('.title'); }

    get inventoryItems() { return this.page.locator('.inventory_item'); }

    get addItemToCartBtns() { return this.page.locator('[id^="add-to-cart"]'); }

    get filterItems() { return this.page.locator('select.product_sort_container'); }

    inventoryItemName = '.inventory_item_name';

    inventoryItemDescription = '.inventory_item_desc';

    inventoryItemPrice = '.inventory_item_price';

    async addItemToCartById(id) {
        await this.inventoryItems.nth(id).locator('[id^="add-to-cart"]').click();
    }

    async addRandomItemsToCart(numberOfItems = 2) {
        const randomItemsIndex = getRandomUniqueNumbersArray(numberOfItems);
        const itemsToAddInCart = [];

        for (let i = 0; i < randomItemsIndex.length; i += 1) {
            itemsToAddInCart.push(
                {
                    name: await this.inventoryItems.nth(randomItemsIndex[i])
                        .locator(this.inventoryItemName).textContent(),
                    description: await this.inventoryItems.nth(randomItemsIndex[i])
                        .locator(this.inventoryItemDescription).textContent(),
                    price: await this.inventoryItems.nth(randomItemsIndex[i])
                        .locator(this.inventoryItemPrice).textContent(),
                },
            );
            await this.addItemToCartById(randomItemsIndex[i]);
        }
        return itemsToAddInCart;
    }

    async openShoppingCart() {
        await this.shopingCart.click();
    }

    async filterItemsBy(criteria) {
        await this.filterItems.selectOption(criteria);
    }

    async verifyItemsSortedBy(criteria) {
        let prices;
        let parsedPrices;
        let names;
        if (criteria === 'Price (low to high)') {
            prices = await this.page.locator(this.inventoryItemPrice).allTextContents();
            parsedPrices = prices.map((element) => parseFloat(element.replace('$', '')));
            return parsedPrices.every((value, index, array) => index === 0 || value >= array[index - 1]);
        }
        if (criteria === 'Price (high to low)') {
            prices = await this.page.locator(this.inventoryItemPrice).allTextContents();
            parsedPrices = prices.map((element) => parseFloat(element.replace('$', '')));
            return parsedPrices.every((value, index, array) => index === 0 || value <= array[index - 1]);
        }
        if (criteria === 'Name (A to Z)') {
            names = await this.page.locator(this.inventoryItemName).allTextContents();
            return JSON.stringify(names) === JSON.stringify(names.sort((a, b) => a - b));
        }
        if (criteria === 'Name (Z to A)') {
            names = await this.page.locator(this.inventoryItemName).allTextContents();
            return JSON.stringify(names) === JSON.stringify(names.sort((a, b) => b - a));
        }
        return null;
    }
}
