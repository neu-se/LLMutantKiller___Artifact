import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly parse a URL with query parameters when given a base URL', () => {
    const baseUrlStr = 'http://example.com/path/to/base?a=1&b=2';
    const currentUrlStr = 'relative/url';
    const resultOriginal = parse(currentUrlStr, baseUrlStr);
    const resultMutated = parse(currentUrlStr, baseUrlStr);
    expect(resultOriginal).not.toBeNull();
    expect(resultOriginal.url).toBe('http://example.com/path/to/base/relative/url');
    expect(resultOriginal.search).toBe('?');
    expect(resultOriginal.querycount).toBe(0);
  });
});