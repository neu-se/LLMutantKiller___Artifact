import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should correctly parse relative URL with query string against base URL', () => {
    const result = parse('page?q=test', 'http://example.com/dir/');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/dir/page?q=test');
    expect(result!.search).toBe('?q=test');
    expect(result!.querycount).toBe(1);
    expect(result!.baseurl).toBe('http://example.com/dir/');
  });
});