import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should correctly resolve relative URL against base URL with query parameters', () => {
    // Base URL has query params, relative URL has path but no query
    // The resolved URL should NOT have the base's query params
    const result = parse('/newpath', 'http://example.com/path?q=test&foo=bar');
    expect(result).not.toBeNull();
    expect(result.url).toBe('http://example.com/newpath');
    expect(result.search).toBeNull();
    expect(result.querycount).toBe(0);
  });
});