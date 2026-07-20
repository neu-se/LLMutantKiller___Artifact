import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL containing query parameters", () => {
  it("should preserve query parameters in baseurl when resolving relative paths", () => {
    const result = parse("relative/path", "http://example.com/base?key=value&another=param");
    expect(result.baseurl).toBe("http://example.com/base?key=value&another=param");
    expect(result.url).toBe("http://example.com/relative/path");
  });
});