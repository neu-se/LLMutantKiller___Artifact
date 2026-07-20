import { parse } from "../../../crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly parse a relative URL when given a base URL', () => {
    const baseUrlStr = 'http://example.com/path/to/base';
    const currentUrlStr = '../relative/url';
    const result = parse(currentUrlStr, baseUrlStr);
    expect(result).not.toBeNull();
    expect(result.url).toBe('http://example.com/path/relative/url');
  });
});