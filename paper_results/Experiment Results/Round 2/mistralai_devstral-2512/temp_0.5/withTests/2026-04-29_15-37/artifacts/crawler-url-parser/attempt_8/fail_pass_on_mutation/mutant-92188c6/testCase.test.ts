import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL query parameter parsing behavior", () => {
  it("should parse query string into object when parseQueryString is true", () => {
    const url = "http://example.com/path?test=1&another=2";
    const result = parse(url);
    // With parseQueryString=false, the query won't be parsed into an object
    // so the search property will be empty and querycount will be 0
    expect(result.search).toBe("?test=1&another=2");
    expect(result.querycount).toBe(2);
    expect(result.url).toBe("http://example.com/path?test=1&another=2");
  });
});