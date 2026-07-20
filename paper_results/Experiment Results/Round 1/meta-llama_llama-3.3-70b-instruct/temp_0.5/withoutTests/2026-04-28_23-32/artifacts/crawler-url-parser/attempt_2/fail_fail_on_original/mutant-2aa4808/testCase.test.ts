import { parse } from "./crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly parse URLs with query parameters', () => {
    const url = 'http://example.com/path?a=1&b=2#fragment';
    const result = parse(url);
    expect(result.search).toBe('?a=1&b=2');
  });
});