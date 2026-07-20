import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly handle a URL that already contains http:// without a base URL', () => {
    // When no baseUrlStr is provided and the URL doesn't match the relative path pattern,
    // the code tries to prepend http://
    // Original regex anchored with ^ won't match at pos 0 for 'http://example.com' (lookahead fails)
    // Mutated regex without ^ will find a later position and corrupt the URL
    const result = parse('http://example.com/page');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/page');
    expect(result!.host).toBe('example.com');
  });
});