import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL", () => {
  it("should correctly handle relative URLs when base URL contains query parameters and the relative URL has none", () => {
    const baseUrl = "http://example.com/base?param=value";
    const relativeUrl = "path";
    const result = parse(relativeUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path");
    expect(result?.path).toBe("/path");
    expect(result?.search).toBeNull();
  });
});