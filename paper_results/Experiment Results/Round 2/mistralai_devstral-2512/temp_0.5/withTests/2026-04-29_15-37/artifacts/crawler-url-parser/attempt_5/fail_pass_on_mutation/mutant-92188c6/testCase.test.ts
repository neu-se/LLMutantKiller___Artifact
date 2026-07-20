import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query parameter parsing", () => {
  it("should correctly parse query string when URL.parse uses parseQueryString=true", () => {
    const url = "http://example.com/path?test=1&another=2";
    const result = parse(url);
    expect(result.search).toBe("?test=1&another=2");
    expect(result.querycount).toBe(2);
    // This will fail with mutated code because the query string won't be parsed
    expect(result.url).toBe("http://example.com/path?test=1&another=2");
  });
});