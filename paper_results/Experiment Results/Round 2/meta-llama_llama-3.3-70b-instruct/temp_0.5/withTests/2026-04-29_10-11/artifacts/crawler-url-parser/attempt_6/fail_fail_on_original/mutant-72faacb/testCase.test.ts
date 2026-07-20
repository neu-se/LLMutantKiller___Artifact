import { extract } from './crawler-url-parser.js';

describe('extract function test', () => {
  it('should pass when href is null', () => {
    const htmlString = '<a href="null">Example</a>';
    const baseUrl = 'https://www.example.com';
    const $ = require('cheerio').load(htmlString);
    const result = extract(htmlString, baseUrl);
    expect(result.length).toBe(0);
  });
});