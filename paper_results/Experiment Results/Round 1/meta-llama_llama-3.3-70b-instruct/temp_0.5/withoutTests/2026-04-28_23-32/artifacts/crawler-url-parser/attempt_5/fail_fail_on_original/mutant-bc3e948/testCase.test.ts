import { extract } from './crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should extract links with correct text', () => {
    const html = '<html><body><a href="https://www.example.com">Example</a></body></html>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(html, sourceUrl);
    expect(result[0].text).toBe('Example');
  });
});