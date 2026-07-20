import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query string parsing", () => {
  it("should correctly parse and count query parameters when parseQueryString is true", () => {
    const currentUrl = "http://example.com/path?foo=bar&baz=qux&test=value";
    const result = parse(currentUrl);

    expect(result).not.toBeNull();
    expect(result?.search).toBe("?foo=bar&baz=qux&test=value");
    expect(result?.querycount).toBe(3);
  });
});