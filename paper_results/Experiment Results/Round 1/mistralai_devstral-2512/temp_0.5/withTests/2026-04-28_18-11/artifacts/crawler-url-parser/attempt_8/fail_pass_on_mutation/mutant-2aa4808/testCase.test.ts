import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL containing hash and query", () => {
  it("should correctly handle base URLs with both hash and query parameters", () => {
    const result = parse("relative", "http://example.com/base?query=value#section");
    expect(result.baseurl).toBe("http://example.com/base?query=value");
    expect(result.url).toBe("http://example.com/relative");
  });
});