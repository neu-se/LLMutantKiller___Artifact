import { extract } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should filter out invalid hrefs', () => {
    const html = '<a href="https://example.com">Valid Link</a>';
    const result = extract(html, 'https://example.com');
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('https://example.com');
  });
});