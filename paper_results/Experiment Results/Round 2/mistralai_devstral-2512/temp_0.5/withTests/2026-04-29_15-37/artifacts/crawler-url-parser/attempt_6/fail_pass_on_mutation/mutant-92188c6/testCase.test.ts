import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL query parameter parsing behavior", () => {
  it("should parse query parameters correctly when parseQueryString is true in URL.parse", () => {
    const url = "http://example.com/path?param1=value1&param2=value2";
    const result = parse(url);
    // The key difference: with parseQueryString=false, the query string won't be properly parsed
    // and querycount will be 0 instead of 2
    expect(result.querycount).toBe(2);
    expect(result.search).toBe("?param1=value1&param2=value2");
  });
});