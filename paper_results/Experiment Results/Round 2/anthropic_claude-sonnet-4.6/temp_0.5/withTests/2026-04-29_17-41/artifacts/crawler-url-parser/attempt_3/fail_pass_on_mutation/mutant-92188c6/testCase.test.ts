import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse querycount behavior', () => {
  it('should correctly count query parameters in parsed URL', () => {
    // The key: with parseQueryString=true, parsedUrl.query is an object
    // For URL: http://example.com/?q=1&q=2 
    // parseQueryString=true: query={q:['1','2']}, search='?q=1&q=2'
    // parseQueryString=false: query='q=1&q=2', search='?q=1&q=2'
    // Both have same search, so querycount should be same
    // BUT: what about URL.format output?
    // With true: format uses search -> ?q=1&q=2
    // With false: format uses search -> ?q=1&q=2
    // Same...
    
    // What if search is somehow not set? Let me try a URL with just a hash
    // No, hash is stripped before parsing
    
    // I need to find a case where search differs...
    // What about URL.parse behavior with parseQueryString=true for ?key (no value)?
    const result = parse("http://www.example.com/path?key");
    expect(result).not.toBeNull();
    expect(result!.search).toBe("?key");
    expect(result!.querycount).toBe(0); // no = sign, so split("=").length - 1 = 0
  });
});