import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should format valueless query parameter with equals sign when resolved against base', () => {
    const result = parse('?foo', 'http://example.com/page');
    expect(result).not.toBeNull();
    // With parseQueryString=true (original): {foo:''} -> formatted as foo= -> URL contains ?foo=
    // With parseQueryString=false (mutated): search '?foo' used directly -> URL contains ?foo without =
    expect(result!.url).toBe('http://example.com/page?foo=');
  });
});