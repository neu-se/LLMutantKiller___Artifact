import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL query parameter handling", () => {
  it("should correctly parse base URL with query parameters when resolving relative URLs", () => {
    const result = parse("path", "http://example.com/base?query=value");
    expect(result?.baseurl).toBe("http://example.com/base?query=value");
    expect(result?.url).toBe("http://example.com/path");
    expect(result?.search).toBeUndefined();
  });
});