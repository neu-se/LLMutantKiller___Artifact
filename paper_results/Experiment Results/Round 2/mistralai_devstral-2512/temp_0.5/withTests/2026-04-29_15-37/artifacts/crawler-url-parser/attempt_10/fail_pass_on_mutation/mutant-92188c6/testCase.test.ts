import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL parsing with query parameters", () => {
  it("should correctly handle query parameters when parseQueryString is true", () => {
    const url = "http://example.com/path?test=1&another=2";
    const result = parse(url);
    // The key difference: with parseQueryString=false, the query string won't be parsed
    // and the search property will be empty, causing querycount to be 0
    expect(result.querycount).toBe(2);
    expect(result.search).toBe("?test=1&another=2");
  });
});