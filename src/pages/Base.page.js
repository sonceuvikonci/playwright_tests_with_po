export class BasePage {
    constructor(page) {
        this.page = page;
        this.url = '';
    }

    // async below added to show the function returns a promise
    async getUrl() { return this.page.url(); }

    async navigate() {
        await this.page.goto(this.url);
    }
}
