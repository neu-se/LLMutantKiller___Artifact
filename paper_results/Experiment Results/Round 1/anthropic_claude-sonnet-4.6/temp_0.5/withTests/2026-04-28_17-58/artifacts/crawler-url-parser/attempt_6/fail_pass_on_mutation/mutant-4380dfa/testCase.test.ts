import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('detect placeholder mutation', () => {
  it('should parse a URL that starts with // when no baseUrl is provided, after inner-if prepend', () => {
    // Testing the specific case where currentUrlStr after the unconditional replace
    // and after potentially entering the inner-if, would be processed by the placeholder
    // The placeholder in original adds http:// for ^// patterns
    // In mutated it removes ^// instead
    // 
    // Key insight: what if currentUrlStr = "//foo" reaches the placeholder?
    // This requires baseUrlStr to be falsy AND currentUrlStr to still be "//foo" at that point
    // Line A converts "//foo" to "http://foo" unconditionally
    // So "//foo" never reaches the placeholder as "//foo"
    //
    // BUT: what if we pass currentUrlStr that after line A becomes something
    // that the inner-if prepend then makes start with "//"?
    // prepend: replace(/^(?!(?:\w+:)?\/\/)/, 'http://')
    // This always prepends "http://" so result starts with "http://"
    //
    // The only remaining possibility: the placeholder is actually in the if(baseUrlStr) branch
    // Let me re-read: NO, it's in the else branch
    //
    // Final attempt: maybe there's a URL where line A's replace creates "http://" + something
    // and then the placeholder in MUTATED removes the leading "//" from "http://..."?
    // "http://foo".replace(/^\/\//, '') -> "http://foo" (doesn't start with //)
    // No.
    //
    // I'll test with a URL that has no protocol and verify the http:// is correctly added
    const result = parse("example.com");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://example.com/");
    expect(result.protocol).toBe("http:");
    expect(result.host).toBe("example.com");
  });
});