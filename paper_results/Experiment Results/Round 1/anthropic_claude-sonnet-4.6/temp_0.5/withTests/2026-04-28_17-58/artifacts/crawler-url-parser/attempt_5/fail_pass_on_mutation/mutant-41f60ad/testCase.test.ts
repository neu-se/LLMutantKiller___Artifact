import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL mutation detection', () => {
  it('should correctly handle URL with query string through the parse function', () => {
    // This test specifically targets the second URL.parse call
    // where parseQueryString changes from true to false
    // The key difference: with true, query is an object; with false, query is a string
    // URL.format uses search when present, but for URLs without query string,
    // it uses query. With true: query={}, with false: query=null
    // Both produce same output... unless there's a specific URL format that differs
    
    // Try a URL that goes through relative resolution with a query string
    // where the intermediate URL.format might produce different results
    const result = parse("?search=test", "http://www.example.com/path");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.example.com/path?search=test");
    expect(result.search).toBe("?search=test");
    expect(result.querycount).toBe(1);
  });
});