import { parse } from "./crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly parse relative URLs with base URL that has a fragment', () => {
    const baseUrl = 'http://example.com/path/to/base';
    const relativeUrl = '../relative/url';
    const result = parse(relativeUrl, baseUrl);
    expect(result.baseurl).toBe('http://example.com/path/to/base');
  });
});