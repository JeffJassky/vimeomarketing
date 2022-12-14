const puppeteer = require('puppeteer');
let browser = null;
let page = null;

const settings = {
    headless: true,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
    ]
}

if(process.env.NODE_ENV === 'PRODUCTION'){
    console.log('Using production settings');
    console.log('Chroium path: /usr/bin/chromium-browser');
    settings.executablePath = '/usr/bin/chromium-browser';
}

module.exports = {
    getBrowser: async function(){
        if(!browser){
            browser = await puppeteer.launch(settings);
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