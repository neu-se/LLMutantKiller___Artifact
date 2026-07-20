import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should not inherit base URL query params when resolving relative path', () => {
    const result = parse('other', 'http://example.com/page?a=1&b=2');
    expect(result).not.toBeNull();
    expect(result!.url).not.toContain('?');
    expect(result!.search).toBeNull();
    expect(result!.querycount).toBe(0);
  });
});