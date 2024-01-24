import * as cheerio from 'cheerio';
import puppeteer from "puppeteer-core";

const scrapeOneProduct = async (productUrl: string) => {
  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://${process.env.BRIGHTDATA_AUTH}@brd.superproxy.io:9222`
  })
  try {

    const page = await browser.newPage()
    console.log('connected to proxy browser')

    page.setDefaultNavigationTimeout(2 * 60 * 1000)

    await page.goto(productUrl)
    
    const content = await page.content()

    const $ = cheerio.load(content)
    const targetContainer = $('.kib-grid').first()
    if (targetContainer.length > 0) {
      const title = targetContainer.find('h1').text().trim()
      const image = targetContainer.find('img').first().attr('src')
      // const currentPrice = targetContainer.find('.kib-product-price').text().trim().match(/\d+\.\d+/)
      const rawCurrentPrice = targetContainer.find('.kib-product-price').text().trim();
      const cleanCurrentPrice = rawCurrentPrice.replace(/[^\d.]/g, '');
      const currentPrice = cleanCurrentPrice ? Number(cleanCurrentPrice) : null;
      const originalPriceElement = targetContainer.find('.kib-product-price--strikethrough')
      const originalPrice = originalPriceElement?.length > 0 ? originalPriceElement.text().trim().replace(/[^\d.]/g, '') : null;
      const miscInfoArray: string[] = [];
      targetContainer.find('h3').each((index, element) => {
        const miscInfoText = $(element).text().trim();
        miscInfoArray.push(miscInfoText);
      });
      const uniqueSetOnly = new Set(miscInfoArray)
      const uniqueMiscInfoArray = [...uniqueSetOnly]
      const productData = {
        url: productUrl,
        image,
        title,
        currentPrice: Number(currentPrice),
        originalPrice: originalPrice !== null ? Number(originalPrice) : null,
        miscInfo: uniqueMiscInfoArray,
        priceHistory: [{ price: Number(currentPrice) || Number(originalPrice), date: Date.now() }],
        lowestPrice: Number(currentPrice) || Number(originalPrice),
        highestPrice: Number(currentPrice) || Number(originalPrice),
        averagePrice: 0
      }

      return productData
    }
  } catch (error) {
    console.log(error)
  } finally {
    await browser?.close()
  }
}

export {
  scrapeOneProduct
}