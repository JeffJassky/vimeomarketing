const puppeteer = require('puppeteer');
let browser = null;
let page = null;
module.exports = {
    getBrowser: async function(){
        if(!browser){
            browser = await puppeteer.launch(
                {
                    headless: true,
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox'
                    ]
                }
            );
        }
        return browser;
    },
    getPage: async function(){
        if(!page){
            page = await (await this.getBrowser()).newPage();
        }
        return page;
    },
    close: async function(){
        await browser.close();
        browser = null;
    }
}