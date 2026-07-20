import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';
import { JSDOM } from 'jsdom';

describe('extract function', () => {
  it('should return different results when trim is used and not used', () => {
    const html = '<a href="http://example.com">   test-link-1   </a>';
    const dom = new JSDOM(html);
    const $ = dom.window.$;

    const textWithTrim = $.text().trim();
    const textWithoutTrim = $.text();

    const resultWithTrim = extract(html, 'http://example.com');
    const resultWithoutTrim = extract(html.replace('$.text().trim()', '$.text()'), 'http://example.com');

    expect(resultWithTrim).not.toEqual(resultWithoutTrim);
  });
});