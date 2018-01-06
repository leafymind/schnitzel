const cheerio = require('cheerio');
const babel = require('babel-core');

const options = {
  plugins: ['transform-decorators-legacy']
};

module.exports = function(source)
{
  const $ = cheerio.load(source, { decodeEntities: false, xmlMode: true });

  $('script')
    .contents()
    .each(function(index, script)
    {
      if (script.data.includes('@hello'))
      {
        script.data = babel.transform(script.data, options).code;
        console.log(script.data);
      }
    });

  return $.html();
};
