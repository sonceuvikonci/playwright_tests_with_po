// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../fixture');

test.describe('', () => {
    test('Perform login', async ({ loginPage, inventoryPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin('standard_user', 'secret_sauce');

        await expect(inventoryPage.headerTitle).toBeVisible();

        expect(await inventoryPage.inventoryItems.count()).toBeGreaterThanOrEqual(1);
    });

    test('Add and remove product from the cart', async ({ loginPage, inventoryPage, shopingCartPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin('standard_user', 'secret_sauce');
        await inventoryPage.addItemToCartById(0);
        expect(await inventoryPage.getNumberOfItemsInCart()).toBe('1');

        await inventoryPage.shopingCart.click();
        expect(await shopingCartPage.cartItems.count()).toBeGreaterThanOrEqual(1);

        await shopingCartPage.removeCartItemById(0);
        await expect(shopingCartPage.cartItems).not.toBeAttached();
    });

    test('Filter products on Inventory page', async ({ loginPage, inventoryPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin('standard_user', 'secret_sauce');
        await inventoryPage.filterItemByPriceAsc();
        expect(await inventoryPage.verifyItemsSortedByPrice(), 'items should be sorted by price ASC').toBeTruthy();
    });

    test('Verify products on Shopping Cart page', async ({ loginPage, inventoryPage, shopingCartPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin('standard_user', 'secret_sauce');
        await inventoryPage.addRandomItemsToCart(2);
        await inventoryPage.shopingCart.click();
        await shopingCartPage.getAllItemsInCart();

        expect(shopingCartPage.allItemsInCart[0]).toEqual(inventoryPage.selectedItems[0]);
        expect(shopingCartPage.allItemsInCart[1]).toEqual(inventoryPage.selectedItems[1]);
    });

    test('Verify calculated Total Price on Checkout page', async ({
        loginPage, inventoryPage, shopingCartPage, checkoutStepOnePage, checkoutStepTwoPage,
    }) => {
        await loginPage.navigate();
        await loginPage.performLogin('standard_user', 'secret_sauce');
        await inventoryPage.addRandomItemsToCart(3);
        await inventoryPage.shopingCart.click();
        await shopingCartPage.clickCheckoutBtn();
        await checkoutStepOnePage.fillCheckoutForm('Olena', 'Olena1', '21001');

        expect(shopingCartPage.allItemsInCart[0]).toEqual(checkoutStepTwoPage.allItemsOnChekout[0]);
        expect(shopingCartPage.allItemsInCart[1]).toEqual(checkoutStepTwoPage.allItemsOnChekout[1]);
        expect(shopingCartPage.allItemsInCart[2]).toEqual(checkoutStepTwoPage.allItemsOnChekout[2]);

        expect(await checkoutStepTwoPage.calculatedPrice()).toEqual(await checkoutStepTwoPage.displayedPrice());
    });
});
