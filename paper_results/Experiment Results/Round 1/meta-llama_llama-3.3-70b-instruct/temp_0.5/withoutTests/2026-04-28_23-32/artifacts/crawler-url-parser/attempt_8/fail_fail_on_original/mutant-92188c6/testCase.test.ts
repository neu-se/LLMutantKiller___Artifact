import { parse } from '../../crawler-url-parser';

describe('crawler-url-parser', () => {
  it('should correctly parse URLs with query parameters and hash', () => {
    const url = 'https://www.example.com/path?a=1&b=2#hash';
    const result = parse(url);
    expect(result.search).toBe('?a=1&b=2');
    const url2 = 'https://www.example.com/path?a=1&b=2&c=3#hash';
    const result2 = parse(url2);
    expect(result2.search).toBe('?a=1&b=2&c=3');
  });
});