import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL", () => {
  it("should correctly handle base URLs with query parameters and hash fragments", () => {
    const baseUrl = "http://example.com/base/path?query=value#section";
    const relativeUrl = "relative/path";
    const result = parse(relativeUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/base/relative/path");
    expect(result?.path).toBe("/base/relative/path");
    expect(result?.search).toBeNull();
  });
});