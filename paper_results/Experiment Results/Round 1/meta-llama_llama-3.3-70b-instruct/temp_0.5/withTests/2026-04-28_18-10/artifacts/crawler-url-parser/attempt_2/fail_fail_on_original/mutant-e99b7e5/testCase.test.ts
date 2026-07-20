import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";
import cheerio from 'cheerio';

describe('extract function test', () => {
  it('should pass when text is null', () => {
    const html = '<a href="http://www.stackoverflow.com"></a>';
    const $ = cheerio.load(html);
    const baseUrl = 'http://www.stackoverflow.com';
    const result = extract($.html(), baseUrl);
    expect(result[0].text).toBe('');
  });
});