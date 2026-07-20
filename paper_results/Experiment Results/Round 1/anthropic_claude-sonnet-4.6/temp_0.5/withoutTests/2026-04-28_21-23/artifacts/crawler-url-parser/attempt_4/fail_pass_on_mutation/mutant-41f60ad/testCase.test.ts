import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should not add trailing question mark to URL without query parameters after relative resolution", () => {
    const result = parse("/newpage", "http://example.com/oldpage?foo=bar");
    expect(result).not.toBeNull();
    // The resolved URL is http://example.com/newpage (no query string)
    // With parseQueryString=true: URL.format({query: {}}) -> "http://example.com/newpage?"
    // With parseQueryString=false: URL.format({query: null}) -> "http://example.com/newpage"
    expect(result.url).toBe("http://example.com/newpage");
  });
});