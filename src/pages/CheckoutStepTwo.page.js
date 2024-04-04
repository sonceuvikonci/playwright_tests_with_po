const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class CheckoutStepTwoPage extends BaseSwagLabPage {
    cartItemSelector = '.cart_item';

    inventoryItemName = '.inventory_item_name';

    inventoryItemDescription = '.inventory_item_desc';

    inventoryItemPrice = '.inventory_item_price';

    get itemPrice() { return this.page.locator('.inventory_item_price'); }

    get totalPrice() { return this.page.locator('.summary_total_label'); }

    get tax() { return this.page.locator('.summary_tax_label'); }

    async getTotalPrice() {
        const totalPrice = await this.totalPrice.textContent();
        return parseFloat(totalPrice.replace('Total: $', '').trim());
    }

    async getTax() {
        const taxValue = await this.tax.textContent();
        return parseFloat(taxValue.replace('Tax: $', '').trim());
    }

    async getAllInventoryItems() {
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
}
