import { parse } from "../../../crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly parse a relative URL when given a base URL with a query parameter', () => {
    const baseUrlStr = 'http://example.com/path/to/base?a=1&b=2';
    const currentUrlStr = 'relative/url';
    const result = parse(currentUrlStr, baseUrlStr);
    expect(result).not.toBeNull();
    expect(result.url).toBe('http://example.com/path/to/base/relative/url');
    expect(result.search).toBe('?');
    expect(result.querycount).toBe(0);
  });
});