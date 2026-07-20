import { parse } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly parse URLs with query parameters and hash', () => {
    const url = 'https://www.example.com/path?a=1&b=2#hash';
    const result = parse(url);
    expect(result.search).toBe('?a=1&b=2');
    const url2 = 'https://www.example.com/path?a=1&b=2';
    const result2 = parse(url2);
    expect(result2.search).toBe('?a=1&b=2');
    const url3 = 'https://www.example.com/path?a=1&b=2&c=3#hash';
    const result3 = parse(url3);
    expect(result3.search).toBe('?a=1&b=2&c=3');
  });
});