const { BasePage } = require('./Base.page');

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.userName = this.page.locator('#user-name');
        this.password = this.page.locator('#password');
        this.loginBtn = this.page.locator('#login-button');
    }

    async performLogin(userName, password) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.loginBtn.click();
    }
}
