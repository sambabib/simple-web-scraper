const puppeteer = require('puppeteer');

let scrape = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://books.toscrape.com');
    await page.waitFor(1000);

    await page.click('#product_gallery > div > div > div > img');

    const result = await page.evaluate(() => {
      let title = document.querySelector('h1').innerText;
      let price = document.querySelector('.price_color').innerText;

      return {
        title,
        price,
      };
    });

    browser.close();
    return result;
  } catch (err) {
    console.log(err);
  }
};

scrape().then((value) => {
  console.log(value);
});
