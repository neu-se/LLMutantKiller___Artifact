import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query string parsing", () => {
  it("should correctly parse query string with special characters when parseQueryString is true", () => {
    const url = "http://example.com/path?param=value%20with%20spaces&other=value%3Dwith%3Dequals";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.search).toBe("?param=value%20with%20spaces&other=value%3Dwith%3Dequals");
    expect(result?.querycount).toBe(2);
  });
});