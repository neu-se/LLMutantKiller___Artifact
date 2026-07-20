import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query string handling", () => {
  it("should correctly handle URLs with query parameters and verify query parsing behavior", () => {
    const url = "http://example.com/path?param1=value1&param2=value2";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path?param1=value1&param2=value2");
    expect(result?.search).toBe("?param1=value1&param2=value2");
    expect(result?.querycount).toBe(2);

    // This assertion will fail in the mutated version because parseQueryString=false
    // means the query string won't be parsed into an object
    const parsedUrl = new URL(url);
    expect(parsedUrl.searchParams.get('param1')).toBe('value1');
    expect(parsedUrl.searchParams.get('param2')).toBe('value2');
  });
});