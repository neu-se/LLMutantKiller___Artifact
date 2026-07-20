import { parse } from './crawler-url-parser';

describe('parse function', () => {
  it('should correctly parse a URL with query parameters', () => {
    const url = 'https://example.com/path?a=1&b=2';
    const result = parse(url);
    expect(result.querycount).toBe(2);
    const urlWithFragment = 'https://example.com/path?a=1&b=2#fragment';
    const resultWithFragment = parse(urlWithFragment);
    expect(resultWithFragment.url).toBe('https://example.com/path?a=1&b=2');
  });
});