import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should correctly resolve dot-relative URL against base URL with query parameters', () => {
    const result = parse('./', 'http://example.com/section/page?a=1&b=2');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/section/');
    expect(result!.search).toBeNull();
    expect(result!.querycount).toBe(0);
  });
});