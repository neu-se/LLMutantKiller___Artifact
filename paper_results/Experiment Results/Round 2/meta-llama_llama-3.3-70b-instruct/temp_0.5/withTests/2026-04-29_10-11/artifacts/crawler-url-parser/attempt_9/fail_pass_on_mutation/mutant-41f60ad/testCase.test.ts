import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should parse URL with query parameters correctly', () => {
    const url = 'https://example.com/path?a=1&b=2&c=3';
    const result = parse(url);
    expect(result.querycount).toBeGreaterThan(0);
    const queryString = result.search.slice(1);
    const params = queryString.split('&');
    expect(params.length).toBe(result.querycount);
  });
});