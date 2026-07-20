import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL query parameter counting", () => {
  it("should correctly count query parameters when parseQueryString is true", () => {
    const url = "http://example.com/path?param1=value1&param2=value2";
    const result = parse(url);
    // With parseQueryString=false, the query string won't be parsed into an object
    // so querycount calculation (parsedUrl.search.split("=").length - 1) will fail
    expect(result.querycount).toBe(2);
  });
});