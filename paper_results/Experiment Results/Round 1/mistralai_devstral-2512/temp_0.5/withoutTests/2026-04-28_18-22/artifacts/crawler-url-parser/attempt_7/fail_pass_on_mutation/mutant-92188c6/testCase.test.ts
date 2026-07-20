import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query parameter parsing", () => {
  it("should correctly parse query parameters when parseQueryString is true", () => {
    const url = "http://example.com/path?test=1&another=2";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result?.querycount).toBe(2);
  });
});