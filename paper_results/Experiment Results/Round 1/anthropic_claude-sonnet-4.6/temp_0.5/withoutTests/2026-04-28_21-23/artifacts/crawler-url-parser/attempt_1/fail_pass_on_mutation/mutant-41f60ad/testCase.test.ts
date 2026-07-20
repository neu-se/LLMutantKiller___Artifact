import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters", () => {
  it("should correctly parse and return a URL with query parameters preserving the query string", () => {
    const result = parse("http://example.com/path?foo=bar&baz=qux");
    
    // The url should contain the query parameters
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://example.com/path?foo=bar&baz=qux");
    // querycount should reflect the number of = signs in the search string
    expect(result.querycount).toBe(2);
    // search should be the raw query string
    expect(result.search).toBe("?foo=bar&baz=qux");
  });
});