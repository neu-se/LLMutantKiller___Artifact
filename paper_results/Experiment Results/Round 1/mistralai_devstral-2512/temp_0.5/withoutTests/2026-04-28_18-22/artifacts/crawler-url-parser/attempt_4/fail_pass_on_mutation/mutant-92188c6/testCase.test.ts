import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query string parsing", () => {
  it("should parse query string when parseQueryString is true", () => {
    const url = "http://example.com/path?key1=value1&key2=value2";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result?.querycount).toBe(2);
  });
});