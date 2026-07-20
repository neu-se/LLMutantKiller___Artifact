import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should correctly set baseurl when base URL has query with plus signs', () => {
    const result = parse('page.html', 'http://example.com/dir/?q=hello+world');
    expect(result).not.toBeNull();
    // With parseQueryString=true: search='?q=hello+world' is used directly
    // With parseQueryString=false: same
    // Both should produce the same baseurl
    expect(result.baseurl).toBe('http://example.com/dir/?q=hello+world');
    expect(result.url).toBe('http://example.com/dir/page.html');
  });
});