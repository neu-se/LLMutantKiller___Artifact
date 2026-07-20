import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract', () => {
  it('should exclude base URL with query params from results', () => {
    const html = '<a href="http://example.com/?foo=bar">self link</a><a href="http://other.com/">other</a>';
    const result = extract(html, 'http://example.com/?foo=bar');
    // base URL should be excluded
    expect(result.some(r => r.url === 'http://example.com/?foo=bar')).toBe(false);
    expect(result.some(r => r.url === 'http://other.com/')).toBe(true);
  });
});