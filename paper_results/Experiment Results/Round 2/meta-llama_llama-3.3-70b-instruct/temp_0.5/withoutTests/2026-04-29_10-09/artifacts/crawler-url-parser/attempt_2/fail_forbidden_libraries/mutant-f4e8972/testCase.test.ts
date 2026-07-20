import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";
import { JSDOM } from 'jsdom';

describe('crawler-url-parser', () => {
  it('should correctly parse HTML data and extract URLs', () => {
    const dom = new JSDOM('<html><body><a href="https://www.example.com">Example</a></body></html>');
    const data = dom.window.document;
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBeGreaterThan(0);
  });
});