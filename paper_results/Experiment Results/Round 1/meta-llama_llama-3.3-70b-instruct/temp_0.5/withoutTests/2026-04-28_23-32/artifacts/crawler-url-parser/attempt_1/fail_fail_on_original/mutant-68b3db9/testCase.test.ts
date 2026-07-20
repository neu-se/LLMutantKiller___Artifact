import { extract } from '../../../crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should trim text when extracting URLs', () => {
    const html = '<a href="https://example.com">  Example  </a>';
    const baseUrl = 'https://example.com';
    const result = extract(html, baseUrl);
    expect(result[0].text).toBe('Example');
  });
});