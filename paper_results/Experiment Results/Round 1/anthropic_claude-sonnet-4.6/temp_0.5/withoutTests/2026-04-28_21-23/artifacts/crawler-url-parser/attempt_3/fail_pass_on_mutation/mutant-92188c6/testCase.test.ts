import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should handle query parameter with no value in relative URL', () => {
    const result = parse('page?foo', 'http://example.com/dir/');
    expect(result).not.toBeNull();
    expect(result!.url).toContain('?foo');
    expect(result!.url).not.toContain('foo=');
  });
});