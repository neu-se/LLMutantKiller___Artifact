import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query string", () => {
  it("should correctly parse query string parameters and return proper querycount", () => {
    // With parseQueryString=true, the query is parsed into an object
    // With parseQueryString=false, the query remains as a raw string
    // The key difference: URL.format behavior changes
    // When query is an object, URL.format uses it; when false, search string is used
    // But when both query (object) and search exist, query takes precedence in URL.format
    // With true: query={a:'1',b:'2'}, search='?a=1&b=2' -> format uses query object
    // With false: query='a=1&b=2', search='?a=1&b=2' -> format uses search string
    
    const result = parse("http://example.com/page?a=1&b=2");
    
    // querycount should be 2 (two = signs)
    expect(result).not.toBeNull();
    expect(result!.querycount).toBe(2);
    
    // The URL should contain the query parameters
    expect(result!.url).toContain("a=1");
    expect(result!.url).toContain("b=2");
    
    // search should be present
    expect(result!.search).toBe("?a=1&b=2");
  });
});