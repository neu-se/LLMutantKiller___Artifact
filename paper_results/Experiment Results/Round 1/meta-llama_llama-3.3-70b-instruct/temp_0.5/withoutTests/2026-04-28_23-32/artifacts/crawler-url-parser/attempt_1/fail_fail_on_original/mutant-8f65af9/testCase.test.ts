import { extract } from '../../../crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly extract text from links', () => {
    const html = '<a href="https://example.com">Link Text</a>';
    const sourceUrl = 'https://example.com';
    const result = extract(html, sourceUrl);
    expect(result[0].text).toBe('Link Text');
  });
});