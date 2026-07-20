import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';
import * as cheerio from 'cheerio';

describe('extract function', () => {
  it('should return an array of objects with url, text, and type properties', () => {
    const html = '<html><body><a href="https://www.example.com">Example</a></body></html>';
    const baseUrl = 'https://www.example.com';
    const result = extract(html, baseUrl);
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toHaveProperty('url');
    expect(result[0]).toHaveProperty('text');
    expect(result[0]).toHaveProperty('type');
  });
});