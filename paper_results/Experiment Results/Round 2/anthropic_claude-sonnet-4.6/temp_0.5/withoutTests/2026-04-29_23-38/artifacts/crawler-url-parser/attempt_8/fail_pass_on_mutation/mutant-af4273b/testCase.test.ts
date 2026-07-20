import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract', () => {
  it('should correctly extract URLs from HTML with base URL containing query parameters', () => {
    const html = '<html><body><a href="page.html">Link</a></body></html>';
    const sourceUrl = 'http://example.com/dir/?q=test';
    const urls = extract(html, sourceUrl);
    expect(urls).toHaveLength(1);
    expect(urls[0].url).toBe('http://example.com/dir/page.html');
    expect(urls[0].type).toBe('sublevel');
  });
});