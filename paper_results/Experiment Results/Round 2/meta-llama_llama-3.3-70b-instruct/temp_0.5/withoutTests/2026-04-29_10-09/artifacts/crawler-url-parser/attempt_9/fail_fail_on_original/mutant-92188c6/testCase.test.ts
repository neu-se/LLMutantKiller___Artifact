import { parse } from '../../crawler-url-parser';

describe('parse function', () => {
  it('should correctly parse a URL with query parameters', () => {
    const url = 'https://example.com/path?a=1&b=2#fragment';
    const result = parse(url);
    expect(result.url).toBe('https://example.com/path?a=1&b=2');
    expect(result.querycount).toBe(2);
  });
});