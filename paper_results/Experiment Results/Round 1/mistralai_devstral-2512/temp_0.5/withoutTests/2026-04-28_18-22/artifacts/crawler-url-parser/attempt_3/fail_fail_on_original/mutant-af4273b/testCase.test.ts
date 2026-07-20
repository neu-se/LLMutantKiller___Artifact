import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL query handling", () => {
  it("should correctly handle base URL query parameters when parsing relative URLs", () => {
    const baseUrl = "http://example.com/base/path?existing=query";
    const relativeUrl = "newpath";
    const result = parse(relativeUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/base/newpath");
    expect(result?.search).toBe("");
    expect(result?.querycount).toBe(0);
    expect(result?.path).toBe("/base/newpath");
  });
});