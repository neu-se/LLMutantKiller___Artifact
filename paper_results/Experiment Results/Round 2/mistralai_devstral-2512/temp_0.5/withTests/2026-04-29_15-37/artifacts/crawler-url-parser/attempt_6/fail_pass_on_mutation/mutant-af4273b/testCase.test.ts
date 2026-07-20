import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL query parameter handling", () => {
  it("should correctly handle base URL with query parameters when resolving relative URLs with existing query", () => {
    const result = parse("path?existing=param", "http://example.com/base?query=value");
    expect(result?.baseurl).toBe("http://example.com/base?query=value");
    expect(result?.url).toBe("http://example.com/path?existing=param");
    expect(result?.querycount).toBe(1);
  });
});