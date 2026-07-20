import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL query parameter parsing", () => {
  it("should correctly count query parameters when URL.parse uses parseQueryString=true", () => {
    const url = "http://example.com/path?key1=value1&key2=value2&key3=value3";
    const result = parse(url);
    // With parseQueryString=false, the query string won't be parsed into an object
    // so querycount will be 0 instead of 3
    expect(result.querycount).toBe(3);
    expect(result.search).toBe("?key1=value1&key2=value2&key3=value3");
  });
});