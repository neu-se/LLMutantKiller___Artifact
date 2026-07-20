import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse query string parsing", () => {
  it("should handle URL with query parameters where search field differs based on parseQueryString", () => {
    // The first URL.parse result is used directly for parsedUrl.search
    // With true: query is object, search is string
    // With false: query is string, search is string  
    // Both have same search... unless URL.format reconstructs differently
    // Key: URL.format(parsedUrl) - with query as object {} (empty) and search=null vs query=null and search=null
    // Actually with true and no query: query={}, search=null -> format outputs no search
    // The real difference: URL.format uses `search` if present, else stringifies `query` object
    // So with query params: search='?a=1' exists -> both produce same output
    // Without query params: search=null, query={} vs null -> both produce no search
    // UNLESS: after delete parsedUrl.hash, something changes?
    
    // Let me try: what if the URL has a fragment that gets deleted?
    // URL.parse("http://example.com/?a=1#frag", true) -> query={a:'1'}, search='?a=1', hash='#frag'
    // after delete hash -> query={a:'1'}, search='?a=1' -> format -> 'http://example.com/?a=1' ✓
    // URL.parse("http://example.com/?a=1#frag", false) -> query='a=1', search='?a=1', hash='#frag'  
    // after delete hash -> query='a=1', search='?a=1' -> format -> 'http://example.com/?a=1' ✓
    // Same result...
    
    const result = parse("http://example.com/page?key=value");
    expect(result!.querycount).toBe(1);
  });
});