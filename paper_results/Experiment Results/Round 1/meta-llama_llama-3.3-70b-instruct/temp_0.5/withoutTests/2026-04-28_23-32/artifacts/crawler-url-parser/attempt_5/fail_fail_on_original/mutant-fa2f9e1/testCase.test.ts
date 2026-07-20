import { extract } from '../../../../../crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly extract text from HTML', () => {
    const html = '<a href="https://www.example.com">Example</a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(html, sourceUrl);
    expect(result[0].text).toBe('Example');
  });
});