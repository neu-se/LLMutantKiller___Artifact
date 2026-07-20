import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters", () => {
  it("should correctly parse URL with multiple query parameters when parseQueryString is true", () => {
    const url = "http://example.com/path?a=1&b=2&c=3&d=4";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result?.querycount).toBe(4);
  });
});