import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query string handling", () => {
  it("should properly handle query parameters when parseQueryString is true", () => {
    const url = "http://example.com/path?test=value&another=param";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result?.search).toBe("?test=value&another=param");
    expect(result?.querycount).toBe(2);
  });
});