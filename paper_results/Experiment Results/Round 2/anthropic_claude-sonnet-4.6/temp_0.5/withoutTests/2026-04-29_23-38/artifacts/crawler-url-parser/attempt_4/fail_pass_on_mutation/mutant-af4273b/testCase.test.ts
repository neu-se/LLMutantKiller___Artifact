import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should preserve query string format in baseurl when resolving relative URLs', () => {
    // With parseQueryString=true, query is parsed to object then re-stringified
    // With parseQueryString=false, query string is kept as-is
    // For a URL with no '=' in query param, the round-trip differs:
    // parseQueryString=true: 'flag' -> {flag: ''} -> 'flag='
    // parseQueryString=false: 'flag' stays as 'flag' in search string
    const result = parse('/newpath', 'http://example.com/path?flag');
    expect(result).not.toBeNull();
    // Original (parseQueryString=true): search='?flag' is used directly by URL.format
    // Both use search directly, so this might be same...
    expect(result.baseurl).toBe('http://example.com/path?flag');
  });
});