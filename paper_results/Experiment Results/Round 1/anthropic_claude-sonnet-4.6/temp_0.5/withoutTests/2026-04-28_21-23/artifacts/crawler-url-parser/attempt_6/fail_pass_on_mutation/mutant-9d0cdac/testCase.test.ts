import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function', () => {
  it('should correctly resolve a relative path URL when base URL is provided', () => {
    // currentUrlStr starts with "../" which matches ^\.*\/ in both cases - same behavior
    // Try a URL that is just word chars with no colon - like "somepage"
    // Both: no match on ^\.*\/ and no match on \w+: or \w: → http:// prepended in both
    // Need something that differs...
    // Try "wp:admin" - 2 char protocol
    // Original: \w+: matches "wp:" → no prepend → protocol wp: → null
    // Mutant: \w: doesn't match "wp:" → prepend http:// → "http://wp:admin" → URL.parse gives protocol http:
    const resultOriginal = parse('wp:admin', 'http://example.com/');
    expect(resultOriginal).toBeNull();
  });
});