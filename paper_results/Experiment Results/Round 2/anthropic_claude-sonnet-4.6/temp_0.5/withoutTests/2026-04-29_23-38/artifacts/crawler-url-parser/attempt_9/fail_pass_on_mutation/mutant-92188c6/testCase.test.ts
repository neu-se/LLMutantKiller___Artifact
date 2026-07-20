import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should handle URL where query parsing affects the resolved URL", () => {
    // Test with a URL that has no query string but base has one
    // The difference between parseQueryString=true (query={}) and false (query=null)
    // might affect how URL.resolve handles the empty query
    const result = parse("newpage.html", "http://example.com/section/?cat=1&page=2");
    expect(result).not.toBeNull();
    // The resolved URL should NOT include the base's query string
    expect(result!.url).toBe("http://example.com/section/newpage.html");
    expect(result!.search).toBeNull();
    expect(result!.querycount).toBe(0);
  });
});