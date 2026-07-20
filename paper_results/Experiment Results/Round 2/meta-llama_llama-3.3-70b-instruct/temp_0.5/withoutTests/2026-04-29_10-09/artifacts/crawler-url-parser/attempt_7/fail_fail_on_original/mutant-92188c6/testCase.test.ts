import { parse } from '../crawler-url-parser';

describe('parse function', () => {
  it('should correctly parse a URL with query parameters', () => {
    const url = 'https://example.com/path?a=1&b=2';
    const result = parse(url);
    expect(result.querycount).toBe(2);
    expect(Object.keys(result).includes('query')).toBe(true);
  });
});