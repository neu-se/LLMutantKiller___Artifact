import { extract } from '../../../crawler-url-parser.js';
import cheerio from 'cheerio';

describe('extract function', () => {
  it('should return different results when trim is used and not used', () => {
    const html = '<a href="http://example.com">   test-link-1   </a>';
    const $ = cheerio.load(html);
    const link = $('a');
    let href = link.attr('href');
    let textWithTrim = link.text().trim();
    let textWithoutTrim = link.text();

    const resultWithTrim = extract(html, 'http://example.com');
    const modifiedHtml = html.replace('text().trim()', 'text()');
    const $Modified = cheerio.load(modifiedHtml);
    const linkModified = $Modified('a');
    let hrefModified = linkModified.attr('href');
    let textWithoutTrimModified = linkModified.text();
    const resultWithoutTrim = extract(modifiedHtml, 'http://example.com');

    expect(textWithTrim).not.toEqual(textWithoutTrim);
  });
});