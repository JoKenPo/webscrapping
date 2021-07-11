const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://instagram.com/rocketseat_oficial');
  // await page.screenshot({ path: 'instagram.png' });

  const imgList = await page.evaluate(() => {
    // toda essa função será executada no browser

    // vamos pegar todas as imagens que estão na parte de posts
    const nodeList = document.querySelectorAll('article img')
    // transformar o NodeList em array
    const imgArray = [...nodeList]

    // transformar os nodes (elementos html) em objeto JS
    const list = imgArray.map(img =>({
      src: img.src
    }))

    // devolver
    return list
  });

  // escrever os dados em um arquivo local (json)
  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err=> {
    if(err) throw new Error('something went wrong')

    console.log('well done!');
  });

  // await browser.close();
})();