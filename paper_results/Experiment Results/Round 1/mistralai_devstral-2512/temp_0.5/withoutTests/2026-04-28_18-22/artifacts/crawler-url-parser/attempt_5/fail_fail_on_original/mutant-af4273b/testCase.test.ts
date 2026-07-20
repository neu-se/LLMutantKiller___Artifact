import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL query parameters", () => {
  it("should correctly resolve relative URLs when base URL contains query parameters", () => {
    const baseUrl = "http://example.com/base?param=value";
    const relativeUrl = "path";
    const result = parse(relativeUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/base/path");
    expect(result?.path).toBe("/base/path");
    expect(result?.search).toBeNull();
  });
});