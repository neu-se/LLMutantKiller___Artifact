import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL containing hash fragment", () => {
  it("should correctly resolve relative URLs when base URL has hash fragment", () => {
    const result = parse("relative-path", "http://example.com/base/path#section");
    expect(result.url).toBe("http://example.com/base/relative-path");
    expect(result.baseurl).toBe("http://example.com/base/path");
  });
});