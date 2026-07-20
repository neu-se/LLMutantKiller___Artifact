import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract', () => {
  it('should extract URLs with query parameters from HTML', () => {
    const html = '<a href="http://example.com/page?a=1&b=2">link</a>';
    const result = extract(html, 'http://example.com/');
    expect(result).toHaveLength(1);
    expect(result[0].url).toContain('a=1');
    expect(result[0].url).toContain('b=2');
  });
});