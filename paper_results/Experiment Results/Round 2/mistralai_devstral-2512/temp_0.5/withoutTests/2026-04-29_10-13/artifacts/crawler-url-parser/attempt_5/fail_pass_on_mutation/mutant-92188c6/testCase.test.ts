import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query string behavior", () => {
  it("should parse query parameters when parseQueryString is true (original behavior)", () => {
    const url = "http://example.com/test?foo=bar&baz=qux";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/test?foo=bar&baz=qux");
    expect(result?.search).toBe("?foo=bar&baz=qux");
    expect(result?.querycount).toBe(2);
  });
});