import { extract } from "../crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should extract links correctly', () => {
    const html = '<html><body><a href="https://www.example.com">Example</a></body></html>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(html, sourceUrl);
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe('https://www.example.com');
    expect(result[0].text).not.toBe(false);
  });
});