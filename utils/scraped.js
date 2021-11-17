const {scrapedLinks} = require('../config/links');
const {links} = require('../config/links');


function scraped(link) {
  if(scrapedLinks.includes(link)){
    return true;
  }
  scrapedLinks.push(link);
  return false;
};

function newLinks(newlinks){
  newlinks.map((link) => {
    if(!scraped(link)){
      return links.push(link);
    }
  });
  return links;
}


module.exports = {scraped, newLinks};