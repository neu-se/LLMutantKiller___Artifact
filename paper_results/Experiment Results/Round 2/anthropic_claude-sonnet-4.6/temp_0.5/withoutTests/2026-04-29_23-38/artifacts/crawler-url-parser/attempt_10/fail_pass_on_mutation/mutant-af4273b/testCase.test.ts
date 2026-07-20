import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should handle relative URL resolution with base URL having query string', () => {
    // Test with a relative URL that has no path (just a query string change)
    // resolved against a base URL that also has a query string
    // The base's query should be replaced by the relative's query
    const result = parse('?newparam=2', 'http://example.com/path?oldparam=1');
    expect(result).not.toBeNull();
    expect(result.url).toBe('http://example.com/path?newparam=2');
    expect(result.search).toBe('?newparam=2');
    expect(result.querycount).toBe(1);
  });
});