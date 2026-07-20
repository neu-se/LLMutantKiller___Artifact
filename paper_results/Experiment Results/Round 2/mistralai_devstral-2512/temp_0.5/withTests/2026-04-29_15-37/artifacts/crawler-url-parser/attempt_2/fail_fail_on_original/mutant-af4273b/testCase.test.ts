import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL query parameter handling", () => {
  it("should preserve query parameters from base URL when parsing relative URLs", () => {
    const result = parse("path", "http://example.com/base?query=value");
    expect(result.url).toBe("http://example.com/base/path");
    expect(result.baseurl).toBe("http://example.com/base?query=value");
  });
});