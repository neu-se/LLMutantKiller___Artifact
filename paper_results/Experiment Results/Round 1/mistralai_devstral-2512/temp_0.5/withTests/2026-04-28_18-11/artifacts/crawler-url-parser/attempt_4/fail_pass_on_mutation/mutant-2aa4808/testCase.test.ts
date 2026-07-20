import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with relative URL and base URL containing query parameters", () => {
  it("should correctly resolve relative URLs when base URL contains query parameters", () => {
    const result = parse("relative/path", "http://example.com/base?param=value");
    expect(result.url).toBe("http://example.com/relative/path");
    expect(result.baseurl).toBe("http://example.com/base?param=value");
  });
});