import { extract } from '../../../crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly handle duplicate URLs with different text', () => {
    const html = '<html><body><a href="https://www.example.com">Example1</a><a href="https://www.example.com">Example2</a></body></html>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(html, sourceUrl);
    expect(result.length).toBe(1);
    expect(result[0].text).not.toBe('Example1');
  });
});