import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should resolve page relative to triple-slash base URL', () => {
    const result = parse('page', '///example.com/dir/');
    // With original (slashesDenoteHost=true): host="" from http:///example.com/dir/
    // The resolved URL behavior might differ between original and mutated
    expect(result).not.toBeNull();
    expect(result?.host).toBe('');
  });
});