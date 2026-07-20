import { parse } from '../../../crawler-url-parser';

describe('parse function', () => {
  it('should correctly parse URLs without protocol', () => {
    const url = 'example.com';
    const expectedUrl = 'http://example.com/';
    const result = parse(url);
    expect(result.url).toBe(expectedUrl);
  });

  it('should correctly parse URLs with protocol', () => {
    const url = 'http://example.com';
    const expectedUrl = 'http://example.com/';
    const result = parse(url);
    expect(result.url).toBe(expectedUrl);
  });

  it('should correctly parse relative URLs', () => {
    const url = '/path/to/resource';
    const baseUrl = 'http://example.com';
    const expectedUrl = 'http://example.com/path/to/resource';
    const result = parse(url, baseUrl);
    expect(result.url).toBe(expectedUrl);
  });

  it('should correctly parse URLs with query parameters', () => {
    const url = 'http://example.com/path/to/resource?q1=value1&q2=value2';
    const expectedUrl = 'http://example.com/path/to/resource?q1=value1&q2=value2';
    const result = parse(url);
    expect(result.url).toBe(expectedUrl);
  });

  it('should correctly parse URLs with fragment', () => {
    const url = 'http://example.com/path/to/resource#fragment';
    const expectedUrl = 'http://example.com/path/to/resource';
    const result = parse(url);
    expect(result.url).toBe(expectedUrl);
  });

  it('should correctly parse URLs without protocol and with path', () => {
    const url = '//example.com/path/to/resource';
    const expectedUrl = 'http://example.com/path/to/resource';
    const result = parse(url);
    expect(result.url).toBe(expectedUrl);
  });
});