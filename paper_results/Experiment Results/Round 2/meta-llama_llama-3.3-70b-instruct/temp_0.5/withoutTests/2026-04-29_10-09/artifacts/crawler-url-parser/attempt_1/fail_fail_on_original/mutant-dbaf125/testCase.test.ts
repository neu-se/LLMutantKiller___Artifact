import { extract } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should not duplicate text when extracting URLs', () => {
    const html = '<html><body><a href="https://www.example.com">Example</a><a href="https://www.example.com">Example</a></body></html>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(html, sourceUrl);
    expect(result.length).toBe(1);
    expect(result[0].text).toBe('Example');
  });
});