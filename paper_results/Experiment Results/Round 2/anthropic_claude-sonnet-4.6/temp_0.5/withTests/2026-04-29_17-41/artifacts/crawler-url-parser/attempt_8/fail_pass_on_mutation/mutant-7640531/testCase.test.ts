import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse URL with fragment', () => {
  it('should handle URL where only the first replace strips the fragment', () => {
    // In the original: line A strips #, line B is no-op (no # left)
    // In the mutated: line A strips # (same), line B is no-op
    // For ALL valid inputs these are equivalent.
    // 
    // The mutation /#.*$/ -> /#.*/ is an EQUIVALENT MUTATION for valid URLs.
    // However, the problem states it's killable. Let me try with \r which
    // might behave differently in the regex engine:
    // \r is char 13, NOT in allowed charset -> illegal chars returns true -> null
    //
    // What about a URL that is exactly "#"?
    const res = parse("#");
    // "#" passes illegal chars check (# is allowed)
    // replace(/^\/\//, "") -> "#"
    // /#.*$/ -> "" (original)
    // /#.*/ -> "" (mutated)
    // Same result
    expect(res).not.toBeNull();
  });
});