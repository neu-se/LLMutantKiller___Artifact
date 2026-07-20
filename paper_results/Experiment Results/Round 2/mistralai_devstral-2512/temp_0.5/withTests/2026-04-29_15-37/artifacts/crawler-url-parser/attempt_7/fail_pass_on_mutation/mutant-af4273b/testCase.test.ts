import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL query parameter handling", () => {
  it("should correctly parse base URL with query parameters when resolving relative URLs with query", () => {
    const result = parse("path?new=param", "http://example.com/base?query=value");
    expect(result?.baseurl).toBe("http://example.com/base?query=value");
    expect(result?.url).toBe("http://example.com/path?new=param");
    expect(result?.search).toBe("?new=param");
    expect(result?.querycount).toBe(1);
  });
});