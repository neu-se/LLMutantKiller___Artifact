import { parse } from './crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly parse relative URLs with query parameters', () => {
    const baseUrlStr = 'http://example.com/path?a=1&b=2';
    const currentUrlStr = '/relative/url?c=3&d=4';
    const result = parse(currentUrlStr, baseUrlStr);
    expect(result).not.toBeNull();
    expect(result.url).toBe('http://example.com/relative/url?c=3&d=4');
    expect(result.baseurl).toBe('http://example.com/path');
    expect(result.protocol).toBe('http:');
    expect(result.host).toBe('example.com');
    expect(result.path).toBe('/relative/url');
    expect(result.search).toBe('?c=3&d=4');
    expect(result.querycount).toBe(2);
  });
});