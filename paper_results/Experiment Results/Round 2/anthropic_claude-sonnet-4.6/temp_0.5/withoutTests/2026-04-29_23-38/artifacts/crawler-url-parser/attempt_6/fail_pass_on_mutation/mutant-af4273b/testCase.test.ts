import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should correctly resolve relative URL against base URL with query parameters', () => {
    const result = parse('page.html', 'http://example.com/dir/?q=test');
    expect(result).not.toBeNull();
    expect(result.url).toBe('http://example.com/dir/page.html');
    expect(result.baseurl).toBe('http://example.com/dir/?q=test');
    expect(result.search).toBeNull();
    expect(result.querycount).toBe(0);
  });
});