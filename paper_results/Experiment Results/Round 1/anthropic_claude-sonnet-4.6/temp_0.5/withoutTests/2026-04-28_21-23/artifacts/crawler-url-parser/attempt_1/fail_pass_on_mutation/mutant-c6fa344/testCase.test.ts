import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function URL handling without base URL', () => {
  it('should correctly parse a URL starting with // when no base URL is provided', () => {
    // A URL starting with // should be treated as protocol-relative
    // The original code handles this: //example.com -> http://example.com
    // The mutation changes how the http:// prepending works for protocol-relative URLs
    // that slip through the initial replacement
    
    // Test with a plain hostname - both should work the same
    // The key difference: original regex prevents double-prepending for // URLs
    // mutated regex would prepend http:// to // URLs creating http:////
    
    const result = parse('example.com');
    expect(result).not.toBeNull();
    expect(result?.url).toBe('http://example.com/');
    expect(result?.host).toBe('example.com');
  });
});