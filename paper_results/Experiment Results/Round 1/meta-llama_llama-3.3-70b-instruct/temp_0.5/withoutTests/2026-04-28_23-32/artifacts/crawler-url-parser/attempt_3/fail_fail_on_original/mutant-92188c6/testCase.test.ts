import { parse } from '../../crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly parse URLs with query parameters', () => {
    const url = 'https://www.example.com/path?a=1&b=2#hash';
    const result = parse(url);
    expect(result.search).toBe('?a=1&b=2');
  });
});