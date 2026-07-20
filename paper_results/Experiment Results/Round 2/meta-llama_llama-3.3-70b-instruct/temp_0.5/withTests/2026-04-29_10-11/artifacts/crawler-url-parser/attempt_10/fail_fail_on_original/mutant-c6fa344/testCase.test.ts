import { parse } from '../crawler-url-parser';

describe('parse function', () => {
  it('should correctly parse URLs without protocol', () => {
    const url = 'example.com';
    const result = parse(url);
    expect(result.url).toBe('http://example.com/');
  });

  it('should correctly parse URLs with protocol', () => {
    const url = 'http://example.com';
    const expectedUrl = 'http://example.com/';
    const result = parse(url);
    expect(result.url).toBe(expectedUrl);
  });

  it('should correctly parse URLs without protocol and with two forward slashes', () => {
    const url = '//example.com';
    const expectedUrl = 'http://example.com/';
    const result = parse(url);
    expect(result.url).toBe(expectedUrl);
  });
});