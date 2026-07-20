import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should correctly resolve relative URL when base URL is protocol-relative with path', () => {
    // When baseUrlStr starts with //, it gets replaced with http://
    // URL.parse('http://example.com/dir/', true, true) - host is 'example.com'
    // The resolved URL should maintain the correct host
    const result = parse('../other', 'http://example.com/dir/page/');
    expect(result).not.toBeNull();
    expect(result.url).toBe('http://example.com/dir/');
    expect(result.host).toBe('example.com');
  });
});