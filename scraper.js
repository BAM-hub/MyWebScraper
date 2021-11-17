const cheerio = require('cheerio');
const request = require('request');

const notNeededLinks = require('./config/terms');
const {links} = require('./config/links.js');
const {scraped} = require('./utils/scraped');
const {newLinks} = require('./utils/scraped');

//console.log(links);
const url = links[0];

if(!scraped(url)) {
  request(url.href, (err, res, html) => {

    if(!err && res.statusCode == 200) {
      const $ = cheerio.load(html);
  
      let headings = [];
      let links = [];
      let scrapedData = {};
  
  
      function footerSkip(el) {
        $(el).find('div').each((i, ele) => {
          
          if($(ele).attr().class !== undefined) {
            if($(ele).attr().class.includes('footer'))return true;
          }
          return false;
        });
      }
  
      $('body').each((i, el) => {
        
        for(let i1 = 1; i1<7; i1++){
          if(footerSkip(el)) return;
  
          if($(el).find(`h${i1}`).text().trim() !== ''){
            headings.push({
              head: $(el).find(`h${i1}`).text().trim(),
              type: `h${i1}`
            });
          }; 
        }
      });
  
      $('a').each((i, el) => {
        if($(el).text().trim() !== '') {
          links.push({
            text: $(el).text().trim(),
            href: $(el).attr('href')
          });
        }
      });
  
      links = links.filter((link) => {
        if(!notNeededLinks.includes(link.text)) return link; 
      });
  
      scrapedData = {
        'links': links,
        'headTages': headings
      };
  
      //sconsole.log(scrapedData);  
      
      newLinks(links);
    }
  });

  links.pop(0);
  console.log(links);

  
}
