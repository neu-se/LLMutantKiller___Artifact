import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query string parsing", () => {
  it("should correctly handle query parameters with encoded characters when parseQueryString is true", () => {
    const currentUrl = "http://example.com/path?param=value%3Dencoded%26special%3Dchars";
    const result = parse(currentUrl);

    expect(result).not.toBeNull();
    expect(result?.querycount).toBe(2);
  });
});