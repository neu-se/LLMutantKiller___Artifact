import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should not corrupt an http URL when parsing without base URL', () => {
    const result = parse('http://test.example.com/foo/bar');
    // Original: regex anchored with ^ won't match at pos 0 (lookahead fails), no replacement
    // Mutated: regex without ^ finds pos 5 (after 'https'), corrupts URL
    expect(result).not.toBeNull();
    expect(result!.url).toContain('test.example.com');
  });
});