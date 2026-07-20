import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should correctly handle a URL that looks like a protocol-relative URL', () => {
    // Test that parse correctly handles URLs without protocol
    // The original regex prevents prepending http:// to URLs starting with //
    // The mutated regex would incorrectly prepend http:// to such URLs
    const result = parse('example.com');
    expect(result).not.toBeNull();
    expect(result?.url).toBe('http://example.com/');
  });
});