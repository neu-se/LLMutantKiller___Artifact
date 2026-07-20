import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should handle edge case base URL', () => {
    // baseUrlStr = '//' -> after replace -> 'http://'
    // URL.parse('http://', true, true) vs URL.parse('http://', true, false)
    // Both should give same result
    // Let me try with baseUrlStr that has no protocol and no //
    // but where URL.resolve gives different results
    const result = parse('/page', 'http://example.com/base/index.html');
    expect(result).not.toBeNull();
    expect((result as any).url).toBe('http://example.com/page');
  });
});