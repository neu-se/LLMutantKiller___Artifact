import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL containing query parameters", () => {
  it("should correctly resolve relative URLs when base URL has query parameters", () => {
    const result = parse("path", "http://example.com/base?query=value");
    expect(result.url).toBe("http://example.com/path");
    expect(result.baseurl).toBe("http://example.com/base?query=value");
  });
});