import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL", () => {
  it("should correctly parse relative URLs with query parameters when base URL has a query string", () => {
    const baseUrl = "http://example.com/path?query=value";
    const relativeUrl = "relative?param=test";
    const result = parse(relativeUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/relative?param=test");
    expect(result?.search).toBe("?param=test");
    expect(result?.querycount).toBe(1);
  });
});