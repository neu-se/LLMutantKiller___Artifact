import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly parse a URL with a query parameter', () => {
    const url = 'http://example.com/path?a=1&b=2';
    const resultOriginal = parse(url);
    expect(resultOriginal).not.toBeNull();
    expect(resultOriginal.url).toBe('http://example.com/path');
    expect(resultOriginal.search).toBe('?a=1&b=2');
    expect(resultOriginal.querycount).toBe(2);
  });
});