import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query parameter parsing", () => {
  it("should correctly handle query parameters with special characters when parseQueryString is true", () => {
    const currentUrl = "http://example.com/path?param=value%20with%20spaces&other=value%3Dwith%3Dequals";
    const result = parse(currentUrl);

    expect(result).not.toBeNull();
    expect(result?.querycount).toBe(2);
  });
});