import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with baseUrl containing fragment', () => {
  it('should correctly resolve a relative URL when baseUrl contains a fragment followed by content', () => {
    // The mutation changes /#.*$/ to /#.*/ 
    // With a baseUrl containing a fragment, the fragment should be stripped
    // Using a URL where the fragment stripping matters for correct resolution
    const baseUrl = 'http://example.com/path/page#section';
    const relativeUrl = 'other-page';
    
    const result = parse(relativeUrl, baseUrl);
    
    // The result should resolve relative to the base URL with fragment stripped
    // Expected: http://example.com/path/other-page
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/path/other-page');
    expect(result!.host).toBe('example.com');
  });
});