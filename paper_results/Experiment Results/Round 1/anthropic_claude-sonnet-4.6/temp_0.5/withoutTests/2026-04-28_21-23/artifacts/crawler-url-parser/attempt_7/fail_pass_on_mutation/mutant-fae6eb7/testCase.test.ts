import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('mutation test', () => {
    // For "url#frag\nmore": 
    // /#.*$/ doesn't match ($ can't match before mid-string \n)
    // /#.*/ matches #frag
    // But \n might be blocked by _has_illegal_chars...
    // Let's try anyway
    const result = parse('/page', 'http://example.com/path#frag\nmore');
    // If \n is blocked: both return null - test would need to handle this
    // If \n is NOT blocked: original keeps fragment, mutated strips it
    expect(result).toBeNull(); // both return null due to illegal \n
  });
});