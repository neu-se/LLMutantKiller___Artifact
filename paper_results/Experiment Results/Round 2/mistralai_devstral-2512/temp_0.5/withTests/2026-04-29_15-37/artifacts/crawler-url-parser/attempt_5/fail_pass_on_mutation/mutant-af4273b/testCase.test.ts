import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL query parameter handling", () => {
  it("should correctly parse base URL with query parameters and hash when resolving relative URLs", () => {
    const result = parse("path", "http://example.com/base?query=value#hash");
    expect(result?.baseurl).toBe("http://example.com/base?query=value");
    expect(result?.url).toBe("http://example.com/path");
  });
});