import { parse } from '../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser';

describe('parse function', () => {
  it('should correctly parse URLs without protocol', () => {
    const url = 'www.example.com';
    const expectedUrl = 'http://www.example.com/';
    const result = parse(url);
    expect(result.url).toBe(expectedUrl);
  });

  it('should correctly parse URLs with protocol', () => {
    const url = 'http://www.example.com';
    const expectedUrl = 'http://www.example.com/';
    const result = parse(url);
    expect(result.url).toBe(expectedUrl);
  });

  it('should correctly parse relative URLs', () => {
    const url = '/path/to/resource';
    const baseUrl = 'http://www.example.com';
    const expectedUrl = 'http://www.example.com/path/to/resource';
    const result = parse(url, baseUrl);
    expect(result.url).toBe(expectedUrl);
  });

  it('should correctly parse URLs with query parameters', () => {
    const url = 'http://www.example.com/path/to/resource?q1=value1&q2=value2';
    const expectedUrl = 'http://www.example.com/path/to/resource?q1=value1&q2=value2';
    const result = parse(url);
    expect(result.url).toBe(expectedUrl);
  });

  it('should correctly parse URLs with fragment', () => {
    const url = 'http://www.example.com/path/to/resource#fragment';
    const expectedUrl = 'http://www.example.com/path/to/resource';
    const result = parse(url);
    expect(result.url).toBe(expectedUrl);
  });
});