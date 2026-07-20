import { URL } from 'url';
import { parse } from '../crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly parse URLs with query parameters', () => {
    const url = 'https://www.example.com/path?a=1&b=2';
    const result = parse(url);
    expect(result.querycount).toBe(2);
    const parsedUrl = new URL(url);
    expect(parsedUrl.searchParams.get('a')).toBe('1');
    expect(parsedUrl.searchParams.get('b')).toBe('2');
  });
});