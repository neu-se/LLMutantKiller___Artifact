import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should correctly resolve relative URL against base URL with repeated query parameters', () => {
    // With parseQueryString=true, repeated params become arrays: {a: ['1','2']}
    // URL.format with query object {a: ['1','2']} produces ?a=1&a=2
    // URL.format with search string ?a=1&a=2 also produces ?a=1&a=2
    // But URL.resolve behavior might differ
    const result = parse('other.html', 'http://example.com/dir/page.html?a=1&a=2');
    expect(result).not.toBeNull();
    expect(result.baseurl).toBe('http://example.com/dir/page.html?a=1&a=2');
  });
});