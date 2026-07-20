import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should parse URL with query parameters correctly', () => {
    const url = 'https://example.com/path?a=1&b=2&c=3#hash';
    const result = parse(url);
    expect(result.querycount).toBe(3);
    expect(result.search).toBe('?a=1&b=2&c=3');
    const queryString = result.search.slice(1);
    const params = queryString.split('&');
    expect(params.length).toBe(3);
    expect(params[0]).toBe('a=1');
    expect(params[1]).toBe('b=2');
    expect(params[2]).toBe('c=3');
    expect(result.search).not.toBeNull();
    expect(result.search).not.toBe('');
    expect(Object.keys(result).includes('query')).toBe(true);
  });
});