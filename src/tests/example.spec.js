// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../fixture');

test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.performLogin('standard_user', 'secret_sauce');
});

test.describe('', () => {
    test('Perform login', async ({ inventoryPage }) => {
        await expect(inventoryPage.headerTitle).toBeVisible();
        expect(await inventoryPage.inventoryItems.count()).toBeGreaterThanOrEqual(1);
    });

    test('Add and remove product from the cart', async ({ inventoryPage, shopingCartPage }) => {
        await inventoryPage.addItemToCartById(0);
        expect(await inventoryPage.getNumberOfItemsInCart()).toBe('1');

        await inventoryPage.shopingCart.click();
        expect(await shopingCartPage.cartItems.count()).toBeGreaterThanOrEqual(1);

        await shopingCartPage.removeCartItemById(0);
        await expect(shopingCartPage.cartItems).not.toBeAttached();
    });

    test('Filter products on Inventory page', async ({ inventoryPage }) => {
        await inventoryPage.filterItemsBy('Price (low to high)');
        expect(await inventoryPage.verifyItemsSortedBy('Price (low to high)'), 'items should be sorted by price ASC').toBeTruthy();

        await inventoryPage.filterItemsBy('Price (high to low)');
        expect(await inventoryPage.verifyItemsSortedBy('Price (high to low)'), 'items should be sorted by price DESC').toBeTruthy();

        await inventoryPage.filterItemsBy('Name (A to Z)');
        expect(await inventoryPage.verifyItemsSortedBy('Name (A to Z)'), 'items should be sorted by name ASC').toBeTruthy();

        await inventoryPage.filterItemsBy('Name (Z to A)');
        expect(await inventoryPage.verifyItemsSortedBy('Name (Z to A)'), 'items should be sorted by name DESC').toBeTruthy();
    });

    test('Verify products on Shopping Cart page', async ({ inventoryPage, shopingCartPage }) => {
        const itemsToAddInCart = await inventoryPage.addRandomItemsToCart(3);

        await inventoryPage.openShoppingCart();
        const itemsAddedToCart = await shopingCartPage.getAllItemsAddedToCart();

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

        const itemsOnCheckout = await checkoutStepTwoPage.getAllInventoryItems();
        const taxValue = await checkoutStepTwoPage.getTax();

        expect(itemsToAddInCart).toEqual(itemsOnCheckout);
        expect(totalPriceItemsInCart + taxValue).toEqual(await checkoutStepTwoPage.getTotalPrice());
    });
});
