// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../fixture');

test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.performLogin('standard_user', 'secret_sauce');
});

test.describe('Saucedemo tests', () => {
    test('Perform login', async ({ inventoryPage }) => {
        await expect(inventoryPage.headerTitle).toBeVisible();
        expect(await inventoryPage.inventoryItems.count()).toBeGreaterThanOrEqual(1);
    });

    test('Add and remove product from the cart', async ({ inventoryPage, shopingCartPage }) => {
        await inventoryPage.addItemToCartById(0);
        expect(await inventoryPage.getNumberOfItemsInCart()).toBe('1');

        await inventoryPage.openShoppingCart();
        expect(await shopingCartPage.items.count()).toBeGreaterThanOrEqual(1);

        await shopingCartPage.removeCartItemById(0);
        await expect(shopingCartPage.items).not.toBeAttached();
    });

    const filterCriteria = ['Price (low to high)', 'Price (high to low)', 'Name (A to Z)', 'Name (Z to A)'];
    for (const criteria of filterCriteria) {
        test(`Filter products on Inventory page ${criteria}`, async ({ inventoryPage }) => {
            await inventoryPage.filterItemsBy(criteria);
            expect(await inventoryPage.verifyItemsSortedBy(criteria), `Items should be sorted by ${criteria}`).toBeTruthy();
        });
    }

    test('Verify products on Shopping Cart page', async ({ inventoryPage, shopingCartPage }) => {
        const itemsToAddInCart = await inventoryPage.addRandomItemsToCart(3);

        await inventoryPage.openShoppingCart();
        const itemsAddedToCart = await shopingCartPage.getItemsList();

        expect(itemsToAddInCart).toEqual(itemsAddedToCart);
    });

    test('Verify calculated Total Price on Checkout page', async ({
        inventoryPage, shopingCartPage, checkoutStepOnePage, checkoutStepTwoPage,
    }) => {
        const itemsToAddInCart = await inventoryPage.addRandomItemsToCart(3);

        await inventoryPage.openShoppingCart();
        const totalPriceItemsInCart = await shopingCartPage.getTotalPriceItemsAddedToCart();

        await shopingCartPage.goToCheckoutStep();
        await checkoutStepOnePage.fillFormWithDataAndSubmit('Olena', 'Olena1', '21001');

        const itemsOnCheckout = await checkoutStepTwoPage.getItemsList();
        const taxValue = await checkoutStepTwoPage.getTax();

        expect(itemsToAddInCart).toEqual(itemsOnCheckout);
        expect(totalPriceItemsInCart + taxValue).toEqual(await checkoutStepTwoPage.getTotalPrice());
    });
});
