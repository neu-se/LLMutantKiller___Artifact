import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly parse URLs with query parameters and fragments', () => {
    const url = 'http://example.com/path?a=1&b=2#fragment';
    const result = parse(url);
    expect(result.url).toBe('http://example.com/path?a=1&b=2');
  });
});