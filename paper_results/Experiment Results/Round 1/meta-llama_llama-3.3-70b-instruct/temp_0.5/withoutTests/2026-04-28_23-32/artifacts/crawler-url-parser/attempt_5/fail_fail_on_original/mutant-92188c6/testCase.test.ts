import { parse } from '../crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly parse URLs with query parameters', () => {
    const url = 'https://www.example.com/path?a=1&b=2';
    const result = parse(url);
    expect(result.querycount).toBe(2);
    const url2 = 'https://www.example.com/path?a=1&b=2&c=3';
    const result2 = parse(url2);
    expect(result2.querycount).toBe(3);
  });
});