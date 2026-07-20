import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with relative URL resolution", () => {
  it("should resolve relative URLs with base URL containing query parameters", () => {
    const baseUrl = "http://example.com/path?param=value";
    const relativeUrl = "subpath";
    const result = parse(relativeUrl, baseUrl);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.url).toBe("http://example.com/subpath");
      expect(result.baseurl).toBe("http://example.com/path?param=value");
    }
  });
});