import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should correctly parse query count for URL with repeated parameter names", () => {
    // querystring.parse handles repeated keys differently
    // parseQueryString=true: {a: ['1','2']} 
    // parseQueryString=false: query string 'a=1&a=2'
    // URL.format with query object {a:['1','2']} -> 'a=1&a=2' (same)
    // But what about the search property used for querycount?
    const result = parse("http://example.com/path?a=1&a=2&b=3");
    expect(result).not.toBeNull();
    expect(result.querycount).toBe(3);
  });
});