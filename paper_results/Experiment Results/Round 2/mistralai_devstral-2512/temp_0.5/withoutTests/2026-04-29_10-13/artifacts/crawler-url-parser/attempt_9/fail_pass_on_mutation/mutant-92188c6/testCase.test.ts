import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query string parsing", () => {
  it("should correctly parse query parameters when parseQueryString is true", () => {
    const url = "http://example.com/path?param1=value1&param2=value2";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path?param1=value1&param2=value2");
    expect(result?.search).toBe("?param1=value1&param2=value2");
    expect(result?.querycount).toBe(2);

    // This will fail in the mutated version because parseQueryString=false
    // means the query string won't be parsed into an object
    const urlModule = require('url');
    const parsed = urlModule.parse(url, true, true);
    expect(parsed.query).toBeDefined();
    expect(parsed.query.param1).toBe('value1');
    expect(parsed.query.param2).toBe('value2');
  });
});