import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query string behavior", () => {
  it("should correctly handle query parameters in relative URLs with base URL", () => {
    const baseUrl = "http://example.com/base";
    const relativeUrl = "path?query=value&test=123";
    const result = parse(relativeUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path?query=value&test=123");
    expect(result?.search).toBe("?query=value&test=123");
    expect(result?.querycount).toBe(2);
    expect(result?.baseurl).toBe("http://example.com/base");
  });
});