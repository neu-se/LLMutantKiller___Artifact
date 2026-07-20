import { extract } from '../../crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should extract links from HTML', () => {
    const html = '<html><body><a href="https://www.example.com">Example</a><a href="https://www.example2.com">Example2</a></body></html>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(html, sourceUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('https://www.example2.com');
    expect(result[0].text).toBe('Example2');
  });
});