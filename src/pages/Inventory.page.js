require('../globalPrototype');

const { getRandomUniqueNumbersArray } = require('../Helper');

const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    selectedItems = [];

    get headerTitle() { return this.page.locator('.title'); } //

    get inventoryItems() { return this.page.locator('.inventory_item'); }

    get addItemToCartBtns() { return this.page.locator('[id^="add-to-cart"]'); }

    get filterItems() { return this.page.locator('select.product_sort_container'); }

    get itemPrice() { return this.page.locator('.inventory_item_price'); }

    async addItemToCartById(id) {
        await this.inventoryItems.nth(id).locator('[id^="add-to-cart"]').click();
    }

    async addRandomItemsToCart(numberOfItems) {
        await this.fillSelectedItemsWithRandomItems(numberOfItems);
        await this.selectedItems.forEachAsync((item) => this.addItemToCartById(item.id));
        // delete item.id to avoid its check in result item object
        this.selectedItems.map((item) => delete item.id);
    }

    async fillSelectedItemsWithRandomItems(numberOfItems) {
        const randomItemsIds = getRandomUniqueNumbersArray(numberOfItems);
        this.selectedItems = await this.collectProductsWithIdsToList(randomItemsIds);
    }

    async filterItemByPriceAsc() {
        await this.filterItems.selectOption('Price (low to high)');
    }

    async verifyItemsSortedByPrice() {
        const itemPrices = await this.page.locator(this.inventoryItemPrice).allTextContents();
        const parsedPrices = itemPrices.map((element) => parseFloat(element.replace('$', '')));
        return parsedPrices.every((value, index, array) => index === 0 || value >= array[index - 1]);
    }
}
