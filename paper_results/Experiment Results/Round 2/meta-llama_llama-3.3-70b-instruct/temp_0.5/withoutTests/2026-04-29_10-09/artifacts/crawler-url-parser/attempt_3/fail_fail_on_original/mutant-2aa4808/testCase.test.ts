import { parse } from "../../../crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly parse a relative URL when given a base URL and the base URL has a query parameter', () => {
    const baseUrlStr = 'http://example.com/path/to/base?a=1';
    const currentUrlStr = 'relative/url';
    const resultOriginal = parse(currentUrlStr, baseUrlStr);
    const resultMutated = parse(currentUrlStr, baseUrlStr);
    expect(resultOriginal).not.toBeNull();
    expect(resultOriginal.url).toBe('http://example.com/path/to/base/relative/url');
  });
});