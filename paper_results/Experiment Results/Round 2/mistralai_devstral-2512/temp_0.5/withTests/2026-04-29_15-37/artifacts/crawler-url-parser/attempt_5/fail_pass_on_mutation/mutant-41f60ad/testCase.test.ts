import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with query parameters', () => {
  it('should correctly parse query parameters and calculate query count when URL.parse is called with parseQueryString=true', () => {
    const result = parse("http://example.com/path?q1=value1&q2=value2&q3=value3");
    expect(result.search).toBe("?q1=value1&q2=value2&q3=value3");
    expect(result.querycount).toBe(3);
    expect(result.path).toBe("/path");
  });
});