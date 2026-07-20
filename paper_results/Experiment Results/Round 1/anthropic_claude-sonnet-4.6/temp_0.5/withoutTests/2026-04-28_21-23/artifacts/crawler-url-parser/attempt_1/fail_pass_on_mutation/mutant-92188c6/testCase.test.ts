import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function with query string', () => {
  it('should correctly parse query parameters and include them in the URL', () => {
    const result = parse('http://example.com/path?foo=bar&baz=qux');
    expect(result).not.toBeNull();
    expect(result!.url).toContain('foo=bar');
    expect(result!.querycount).toBe(2);
  });
});