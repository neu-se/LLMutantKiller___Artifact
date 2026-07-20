import { parse } from '../../crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly parse URLs without protocol and with a colon in the hostname part', () => {
    const url = 'http://:example.com';
    const result = parse(url);
    expect(result).toBeNull();
  });

  it('should correctly parse URLs without protocol but with two forward slashes', () => {
    const url = '//example.com';
    const expectedUrl = 'http://example.com/';
    const result = parse(url);
    expect(result.url).toBe(expectedUrl);
  });
});