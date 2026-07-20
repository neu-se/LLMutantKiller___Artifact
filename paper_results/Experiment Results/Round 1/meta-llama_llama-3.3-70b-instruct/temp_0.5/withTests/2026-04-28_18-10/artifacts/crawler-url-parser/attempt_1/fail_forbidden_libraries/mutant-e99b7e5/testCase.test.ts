import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";
import { JSDOM } from 'jsdom';

describe('extract function test', () => {
  it('should pass when text is null', () => {
    const html = '<a href="http://www.stackoverflow.com">test-link-1</a>';
    const dom = new JSDOM(html);
    const $ = dom.window.$;
    const baseUrl = 'http://www.stackoverflow.com';
    const result = extract($.html(), baseUrl);
    expect(result[0].text).toBe('test-link-1');
  });

  it('should fail when text is "Stryker was here!"', () => {
    const html = '<a href="http://www.stackoverflow.com"></a>';
    const dom = new JSDOM(html);
    const $ = dom.window.$;
    const baseUrl = 'http://www.stackoverflow.com';
    const result = extract($.html(), baseUrl);
    expect(result[0].text).not.toBe('Stryker was here!');
  });
});