import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should trim text when extracting URLs', () => {
    const html = '<a href="https://example.com">  Example  </a>';
    const baseUrl = 'https://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('https://example.com');
    expect(result[0].text).not.toBeNull();
    const text = result[0].text;
    expect(text).not.toContain('  ');
  });
});