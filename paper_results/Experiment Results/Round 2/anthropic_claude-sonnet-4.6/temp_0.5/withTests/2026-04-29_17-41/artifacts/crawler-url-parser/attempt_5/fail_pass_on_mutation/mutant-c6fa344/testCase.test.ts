import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with localhost:// URL', () => {
  it('should handle localhost:// URL without prepending http://', () => {
    const res = parse("localhost://example");
    // localhost:// - outer condition enters block (localhost excluded from \w+: match)
    // original: lookahead sees localhost:// matches (word:)?// -> no prepend -> "localhost://example"
    // mutated: lookahead sees localhost:// matches word:// -> no prepend -> "localhost://example"  
    // Both: protocol is "localhost:" which is invalid -> returns null
    expect(res).toBeNull();
  });
});