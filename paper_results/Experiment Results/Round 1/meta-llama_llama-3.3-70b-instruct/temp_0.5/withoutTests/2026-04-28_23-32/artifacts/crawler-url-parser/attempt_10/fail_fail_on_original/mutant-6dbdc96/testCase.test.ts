import { extract } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should extract links correctly', () => {
    const html = '<html><body><a href="javascript:void(0)">Example</a></body></html>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(html, sourceUrl);
    expect(result.length).toBe(0);
  });
});