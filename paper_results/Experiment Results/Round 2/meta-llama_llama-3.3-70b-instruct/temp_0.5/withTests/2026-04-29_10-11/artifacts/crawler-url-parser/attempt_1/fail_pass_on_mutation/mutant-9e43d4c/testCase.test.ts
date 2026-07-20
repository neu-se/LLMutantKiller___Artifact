import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should parse URL correctly', () => {
    const url = 'https://example.com/path?query#fragment';
    const parsedUrl = parse(url);
    expect(parsedUrl.url).toBe('https://example.com/path?query');
  });

  it('should not parse URL with invalid protocol', () => {
    const url = 'htp://example.com';
    const parsedUrl = parse(url);
    expect(parsedUrl).toBeNull();
  });

  it('should parse URL with relative path', () => {
    const url = '/path';
    const baseUrl = 'https://example.com';
    const parsedUrl = parse(url, baseUrl);
    expect(parsedUrl.url).toBe('https://example.com/path');
  });

  it('should parse URL with query parameters', () => {
    const url = 'https://example.com/path?q1=value1&q2=value2';
    const parsedUrl = parse(url);
    expect(parsedUrl.url).toBe('https://example.com/path?q1=value1&q2=value2');
  });

  it('should parse URL with fragment', () => {
    const url = 'https://example.com/path#fragment';
    const parsedUrl = parse(url);
    expect(parsedUrl.url).toBe('https://example.com/path');
  });
});