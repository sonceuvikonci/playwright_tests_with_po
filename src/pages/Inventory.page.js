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

    async filterItemsBy(criteria) {
        await this.selectItems.selectOption(criteria);
    }

    async verifyItemsSortedBy(criteria) {
        let prices;
        let parsedPrices;
        let names;
        let isArraySorted;

        switch (criteria) {
            case 'Price (low to high)':
                prices = await this.itemPrice.allTextContents();
                parsedPrices = prices.map((element) => parseFloat(element.replace('$', '')));
                isArraySorted = parsedPrices.every((value, index, array) => index === 0 || value >= array[index - 1]);
                break;
            case 'Price (high to low)':
                prices = await this.itemPrice.allTextContents();
                parsedPrices = prices.map((element) => parseFloat(element.replace('$', '')));
                isArraySorted = parsedPrices.every((value, index, array) => index === 0 || value <= array[index - 1]);
                break;
            case 'Name (A to Z)':
                names = await this.itemPrice.allTextContents();
                isArraySorted = JSON.stringify(names) === JSON.stringify(names.sort((a, b) => a - b));
                break;
            case 'Name (Z to A)':
                names = await this.itemPrice.allTextContents();
                isArraySorted = JSON.stringify(names) === JSON.stringify(names.sort((a, b) => b - a));
                break;
            default:
                throw new Error('Incorrect sorting criteria!');
        }
        return isArraySorted;
    }
}
