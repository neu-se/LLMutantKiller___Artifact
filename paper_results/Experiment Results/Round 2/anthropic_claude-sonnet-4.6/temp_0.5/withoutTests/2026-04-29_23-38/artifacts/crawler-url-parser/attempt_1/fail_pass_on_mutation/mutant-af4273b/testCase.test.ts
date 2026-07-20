import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse with base URL containing query parameters', () => {
  it('should correctly resolve a relative URL against a base URL with query parameters', () => {
    // Base URL has query parameters - this is where the mutation matters
    // parseQueryString=true (original) vs false (mutated) affects how query is handled
    const baseUrl = 'http://example.com/path?foo=bar&baz=qux';
    const relativeUrl = '/newpath';
    
    const result = parse(relativeUrl, baseUrl);
    
    // The resolved URL should be http://example.com/newpath (without query params from base)
    expect(result).not.toBeNull();
    expect(result.url).toBe('http://example.com/newpath');
    expect(result.host).toBe('example.com');
    expect(result.path).toBe('/newpath');
  });
});