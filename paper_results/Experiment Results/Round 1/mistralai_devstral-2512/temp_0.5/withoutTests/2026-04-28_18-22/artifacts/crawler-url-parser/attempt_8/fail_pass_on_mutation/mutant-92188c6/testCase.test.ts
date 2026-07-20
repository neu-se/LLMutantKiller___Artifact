import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query string handling", () => {
  it("should parse query string correctly when parseQueryString is true", () => {
    const url = "http://example.com/path?key1=value1&key2=value2";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result?.querycount).toBe(2);
  });
});