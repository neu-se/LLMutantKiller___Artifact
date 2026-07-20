import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should throw an error when cheerio.load is called with a non-string argument', () => {
    const html = '<html><body><a href="https://www.example.com">Example</a></body></html>';
    const baseUrl = 'https://www.example.com';
    const $ = true ? cheerio.load(html) : html;
    expect(() => extract($, baseUrl)).toThrowError();
  });
});