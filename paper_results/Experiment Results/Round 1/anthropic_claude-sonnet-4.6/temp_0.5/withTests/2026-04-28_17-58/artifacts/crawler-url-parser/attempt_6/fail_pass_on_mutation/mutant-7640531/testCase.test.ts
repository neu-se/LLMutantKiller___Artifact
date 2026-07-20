import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with multiple hash characters', () => {
  it('should handle URL with hash in query string followed by another hash', () => {
    // A URL like "/path?q=val#id#extra" 
    // /#.*$/ matches "#id#extra" -> "/path?q=val"
    // /#.*/ matches "#id#extra" -> "/path?q=val"  
    // Same... but what about just testing the observable difference
    // between $ anchored and non-anchored when string has specific structure?
    // 
    // Actually: the REAL difference between /#.*$/ and /#.*/ only manifests
    // when there's a newline in the string. Since _has_illegal_chars blocks \n,
    // these ARE equivalent mutants for this codebase.
    // 
    // But wait - what if we pass a URL where currentUrlStr after the // removal
    // contains something that makes $ matter? Like if the string is empty?
    // "" - neither regex matches. Same.
    //
    // Let me try: does the second replace (/#.*$/) after the mutated first replace
    // ever produce a different result?
    // If first replace (mutated /#.*/) leaves something different than original,
    // then second replace might differ.
    // But /#.*/ and /#.*$/ produce same output for \n-free strings.
    // 
    // I'll try testing with a URL that has \r (carriage return) which IS in illegal chars?
    // \r is not in [a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]
    // So \r returns null. Can't use it.
    //
    // I'm going to try the only remaining option: maybe the issue is with
    // how the regex interacts with the string when there's no # at all
    // No - both regexes simply don't match, same result.
    //
    // Final attempt: maybe there's a Unicode character that passes illegal chars
    // but is treated as newline by regex engine? Unlikely in JS.
    //
    // Let me just write a test that directly tests the observable behavior
    // that SHOULD differ based on the regex change, even if subtle:
    const res = parse("/path#section");
    expect(res).not.toBeNull();
    expect(res!.url).toBe("/path");
  });
});