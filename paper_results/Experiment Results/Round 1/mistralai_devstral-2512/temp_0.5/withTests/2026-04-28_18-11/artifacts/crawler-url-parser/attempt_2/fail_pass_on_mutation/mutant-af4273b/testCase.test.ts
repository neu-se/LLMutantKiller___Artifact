import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters in base URL", () => {
  it("should preserve query parameters from base URL when parsing relative URLs", () => {
    const result = parse("relative/path", "http://example.com/base/path?query=value&another=param");
    expect(result.baseurl).toBe("http://example.com/base/path?query=value&another=param");
  });
});