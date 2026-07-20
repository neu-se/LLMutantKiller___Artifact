import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should handle URL starting with :// (non-word chars before ://) without base URL", () => {
    // '://example.com' enters the no-baseUrl block (no \w+: prefix, no leading /)
    // Original (\w+): lookahead (?!\w+://) - ':' is not \w, so no match, http:// IS prepended
    //   → 'http://://example.com' → URL.parse → protocol 'http:' → not null result
    // Mutated (\W+): lookahead (?!\W+://) - ':' IS \W, matches \W+:// → lookahead FAILS
    //   → no prepend → '://example.com' → URL.parse → protocol ':' → filtered out → null
    const result = parse("://example.com");
    expect(result).not.toBeNull();
    expect(result!.protocol).toBe("http:");
  });
});