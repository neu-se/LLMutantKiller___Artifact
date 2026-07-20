import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL query parameters", () => {
  it("should correctly handle base URL query parameters when parsing relative URLs", () => {
    const baseUrl = "http://example.com/base/path?key=value";
    const relativeUrl = "newpath";
    const result = parse(relativeUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/base/newpath");
    expect(result?.path).toBe("/base/newpath");
    expect(result?.search).toBeNull();
  });
});