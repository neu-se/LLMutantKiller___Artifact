import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters in base URL", () => {
  it("should correctly resolve relative URLs with query parameters in base URL", () => {
    const result = parse("relative/path", "http://example.com/base/path?query=value");
    expect(result.url).toBe("http://example.com/base/relative/path");
    expect(result.baseurl).toBe("http://example.com/base/path?query=value");
  });
});