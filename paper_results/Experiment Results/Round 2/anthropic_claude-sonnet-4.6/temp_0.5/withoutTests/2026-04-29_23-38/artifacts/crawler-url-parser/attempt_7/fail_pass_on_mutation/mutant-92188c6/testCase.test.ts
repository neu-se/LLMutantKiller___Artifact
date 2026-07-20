import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should handle URL with query string where parseQueryString affects output", () => {
    // Test with a URL where the query string has array-like parameters
    const result = parse("http://example.com/?a=1&a=2");
    expect(result).not.toBeNull();
    expect(result!.querycount).toBe(2);
    expect(result!.url).toBe("http://example.com/?a=1&a=2");
  });
});