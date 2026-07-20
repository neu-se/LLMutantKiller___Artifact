import { parse } from "./crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly parse relative URLs with base URL', () => {
    const baseUrl = 'http://example.com/path/to/base';
    const relativeUrl = '../relative/url';
    const result = parse(relativeUrl, baseUrl);
    expect(result.baseurl).toBe('http://example.com/path/to/base');
    expect(result.url).toBe('http://example.com/path/relative/url');
  });
});