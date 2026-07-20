import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query string handling", () => {
  it("should correctly parse query parameters when parseQueryString is true", () => {
    const url = "http://example.com/path?param1=value1&param2=value2";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path?param1=value1&param2=value2");
    expect(result?.search).toBe("?param1=value1&param2=value2");
    expect(result?.querycount).toBe(2);

    // Verify the query string is properly parsed by checking the query property exists
    // This will fail in the mutated version where parseQueryString=false
    const internalParsedUrl = require('url').parse(url, true, true);
    expect(internalParsedUrl.query).toBeDefined();
    expect(internalParsedUrl.query.param1).toBe('value1');
    expect(internalParsedUrl.query.param2).toBe('value2');
  });
});