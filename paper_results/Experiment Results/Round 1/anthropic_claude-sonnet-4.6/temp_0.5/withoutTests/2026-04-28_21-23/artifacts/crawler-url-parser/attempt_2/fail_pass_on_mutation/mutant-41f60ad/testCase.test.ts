import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should not append extra ? to URL without query parameters when using relative URL resolution", () => {
    // When a relative URL is resolved against a base URL with no query string,
    // the resulting URL should not have a trailing ?
    const result = parse("/page", "http://example.com/base");
    expect(result).not.toBeNull();
    // With parseQueryString=true, URL.format({query: {}}) adds '?' 
    // With parseQueryString=false, URL.format({query: null}) does not
    expect(result.url).toBe("http://example.com/page");
    expect(result.search).toBeNull();
  });
});