import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse with base URL containing query parameters', () => {
  it('should correctly resolve a relative URL against a base URL with query parameters', () => {
    const result = parse('/newpath', 'http://example.com/page?foo=bar&baz=qux');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/newpath');
  });
});