import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse with query string', () => {
  it('should correctly parse query count for URL with query parameters', () => {
    const result = parse('http://example.com/page?foo=bar&baz=qux');
    expect(result).not.toBeNull();
    expect(result.querycount).toBe(2);
    expect(result.search).toBe('?foo=bar&baz=qux');
  });
});