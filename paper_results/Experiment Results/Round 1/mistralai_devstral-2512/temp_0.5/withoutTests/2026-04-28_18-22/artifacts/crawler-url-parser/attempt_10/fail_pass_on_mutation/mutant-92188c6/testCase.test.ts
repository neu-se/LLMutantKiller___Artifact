import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query string parsing", () => {
  it("should correctly parse query string when parseQueryString is true", () => {
    const url = "http://example.com/path?param1=value1&param2=value2";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result?.querycount).toBe(2);
  });
});