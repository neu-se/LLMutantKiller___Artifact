import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function', () => {
  it('should handle two-character protocol scheme correctly when baseUrl is provided', () => {
    // "ab:" has 2 word chars - matches \w+: (original) but NOT \w: (mutant)
    // Original: ab: matches, no http:// prepend, protocol ab: → null (not http/https)
    // Mutant: ab: doesn't match \w:, http:// prepended → parsedUrl.host = null, resolves relative to base
    const result = parse('ab://example.com', 'http://base.com/');
    expect(result).toBeNull();
  });
});