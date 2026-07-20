import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query parameter handling", () => {
  it("should correctly count query parameters when parseQueryString is true", () => {
    const currentUrl = "http://example.com/path?a=1&b=2&c=3";
    const result = parse(currentUrl);

    expect(result).not.toBeNull();
    expect(result?.querycount).toBe(3);
  });
});