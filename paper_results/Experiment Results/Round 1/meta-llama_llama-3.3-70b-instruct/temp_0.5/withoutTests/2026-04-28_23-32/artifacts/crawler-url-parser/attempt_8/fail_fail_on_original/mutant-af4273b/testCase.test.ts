import { parse } from './crawler-url-parser';

describe('crawler-url-parser', () => {
  it('should correctly parse URLs with query parameters', () => {
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
    const baseUrlStr2 = 'http://example.com/path?a=1&b=2#hash';
    const currentUrlStr2 = '/relative/url?c=3&d=4';
    const result2 = parse(currentUrlStr2, baseUrlStr2);
    expect(result2).not.toBeNull();
    expect(result2.url).toBe('http://example.com/relative/url?c=3&d=4');
    expect(result2.baseurl).toBe('http://example.com/path');
    expect(result2.protocol).toBe('http:');
    expect(result2.host).toBe('example.com');
    expect(result2.path).toBe('/relative/url');
    expect(result2.search).toBe('?c=3&d=4');
    expect(result2.querycount).toBe(2);
  });
});