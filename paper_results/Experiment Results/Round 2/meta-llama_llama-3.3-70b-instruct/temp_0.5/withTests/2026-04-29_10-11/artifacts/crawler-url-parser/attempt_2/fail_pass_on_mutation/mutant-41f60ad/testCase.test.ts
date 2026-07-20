import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should parse URL with query parameters correctly', () => {
    const url = 'https://example.com/path?a=1&b=2&c=3#hash';
    const result = parse(url);
    expect(result.url).toBe('https://example.com/path?a=1&b=2&c=3');
    expect(result.querycount).toBe(3);
  });
});