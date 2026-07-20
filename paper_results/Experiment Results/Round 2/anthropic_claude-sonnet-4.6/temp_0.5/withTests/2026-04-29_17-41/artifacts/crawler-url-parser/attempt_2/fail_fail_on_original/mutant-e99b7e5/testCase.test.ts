import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";
const cheerio = require('cheerio');

describe('extract text when anchor text is null', () => {
  it('should set text to empty string (not "Stryker was here!") when text is null', () => {
    const $ = cheerio.load('<html><body><a href="http://www.example.com/page">hello</a></body></html>');
    const originalText = $.fn.text;
    $.fn.text = function() {
      const result = originalText.call(this);
      if (result === 'hello') return null;
      return result;
    };
    const result = extract($, 'http://www.other.com/');
    const found = result.find((r: any) => r.url === 'http://www.example.com/page');
    expect(found).toBeDefined();
    expect(found!.text).toBe('');
  });
});