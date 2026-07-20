import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should correctly parse relative URL with query parameters against base URL', () => {
    // Relative URL with query params resolved against base URL
    const result = parse('page?foo=1&bar=2', 'http://example.com/dir/');
    expect(result).not.toBeNull();
    expect(result.querycount).toBe(2);
    expect(result.search).toBe('?foo=1&bar=2');
    expect(result.url).toBe('http://example.com/dir/page?foo=1&bar=2');
  });
});