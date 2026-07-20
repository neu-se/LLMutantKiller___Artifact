import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with two-character protocol-like prefix without base URL', () => {
  it('should correctly handle a URL with a two-character word sequence before colon as a protocol', () => {
    // "ab://example.com" has a two-char protocol "ab:"
    // Original regex /^(?!(?:\w+:)?\/\/)/ correctly identifies "ab://" as protocol-like and does NOT prepend http://
    // Mutated regex /^(?!(?:\w:)?\/\/)/ only handles single-char protocols, so it WOULD prepend http:// to "ab://example.com"
    // However "ab:" is not http/https so it returns null either way.
    // Instead, test "ab.com" style - actually let's test "https://example.com" going through the no-baseUrl path
    // A cleaner approach: use a URL that starts with two word chars + "://" 
    // With original: not prepended (recognized as having protocol-like prefix)
    // With mutated: prepended with http://, resulting in "http://ab://example.com" -> null (invalid protocol)
    // But "ab://" returns null anyway due to invalid protocol check.
    
    // Better: test "google.com" - both handle same. 
    // The real difference: original treats \w+ (1+) before ://, mutated treats \w (exactly 1).
    // So "ab://..." - original skips prepend, mutated prepends. Both return null for invalid protocol.
    // For "http://example.com" without baseUrl - outer condition !/^\.*\/|^(?!localhost)\w+:/ is false, skips block entirely.
    
    // The mutation only matters when no baseUrl and URL doesn't match outer condition.
    // Outer: !/^\.*\/|^(?!localhost)\w+:/.test(url) must be true to enter block.
    // "ab://example.com" - does \w+: match? Yes "ab:" matches \w+:, so outer is false -> skip block.
    // So the inner regex change only matters for URLs that pass the outer check.
    // Outer check passes when URL doesn't start with ./ or have \w+: pattern.
    // A URL like "example.com" passes outer check (no protocol).
    // Then inner: original adds http:// if not already //protocol. mutated same for simple cases.
    // The key: a URL like "a://example.com" - outer: "a:" matches \w+: so outer=false, skip.
    // The mutation is unreachable in practice? Let me re-read...
    
    // Actually the outer regex is /^\.*\/|^(?!localhost)\w+:/ 
    // This matches: starts with optional dots then slash, OR (not localhost) word+colon
    // If this matches, the condition !match is false, so we DON'T enter the if block.
    // We enter the if block only when URL does NOT start with ./ AND does NOT have \w+: prefix.
    // So for "example.com" - no \w+: prefix at start... wait "example" then ".com" - no colon.
    // For "google.com" - no colon, so \w+: doesn't match -> outer condition is true -> enter block.
    // Inside: original /^(?!(?:\w+:)?\/\/)/ on "google.com" -> matches (no ://) -> prepend http://
    // mutated: same result for "google.com".
    // The difference would show for a URL like "a://..." but those are filtered by outer condition.
    // Hmm, this is tricky. Let me think about what URL would differ...
    
    // Actually wait - what about "ab.cd://example.com"? The \w+: would match "ab" then "." then... 
    // No, \w doesn't match ".". So "ab.cd://example.com" - \w+: tries to match from start: "ab" then "." fails.
    // So outer condition: does NOT match \w+: -> enters block.
    // Inside original: /^(?!(?:\w+:)?\/\/)/ on "ab.cd://example.com" 
    //   lookahead: (?:\w+:)?\/\/ - tries \w+: = "ab" then "." fails, so \w+: optional -> tries // -> "ab" != "/" -> lookahead fails -> regex matches -> prepend http://
    // Inside mutated: same result - prepend http://
    // Still same...
    
    // The ONLY case that differs: a string that passes outer check but inner check differs.
    // Outer passes (enters block) when no \w+: at start.
    // Inner original: don't prepend if starts with \w+:// or //
    // Inner mutated: don't prepend if starts with \w:// (single char) or //
    // So "ab://" would be caught by original (don't prepend) but NOT by mutated (would prepend).
    // But "ab://" has "ab:" which matches outer \w+: -> outer=false -> skip block entirely!
    // So the inner regex change seems unreachable... unless I'm wrong about the outer regex.
    
    // Let me re-examine: /^\.*\/|^(?!localhost)\w+:/
    // This is: (^\.*\/) OR (^(?!localhost)\w+:)
    // For "ab://example.com": ^(?!localhost)\w+: matches "ab:" -> outer matches -> !outer = false -> skip block
    // For "//example.com": ^\.*\/ - starts with optional dots then slash - "//" starts with "/" -> matches -> skip block
    // So any URL with \w+: or starting with / would skip the block.
    // The inner regex would only run for URLs with NO protocol and NOT starting with /.
    // For such URLs, they can't start with \w+:// either (since that would have been caught by outer).
    // CONCLUSION: The mutation may be unreachable in practice. But let me check one more time...
    
    // What if URL = "a:path" (single char + colon, no //)? 
    // Outer: \w+: matches "a:" -> skip block. Both behave same.
    // What if URL = "ab:path" (two chars + colon, no //)?
    // Outer: \w+: matches "ab:" -> skip block. Both behave same.
    // So the inner regex change truly seems unreachable via the outer guard.
    
    // BUT WAIT - I need to look more carefully. The outer test is on the ORIGINAL currentUrlStr
    // before any replacements. But the replacements happen BEFORE the if block:
    // currentUrlStr = currentUrlStr.replace(/^\/\//, 'http://');  <- this runs first!
    // currentUrlStr = currentUrlStr.replace(/#.*$/, '');           <- this runs second
    // THEN the if(!baseUrlStr) block runs.
    // So "//example.com" becomes "http://example.com" before the check.
    // "http://example.com" -> outer: \w+: matches "http:" -> skip block. OK same.
    
    // I think the mutation might be effectively unreachable given the outer guard.
    // But the test needs to pass on original and fail on mutated.
    // Let me look at this differently - maybe I should just test the existing behavior
    // that existing tests already cover, and see which one would differ.
    
    // From existing tests: cup.parse("aaa") should return url = "http://aaa/"
    // Both original and mutated would handle "aaa" the same way (prepend http://).
    
    // I wonder if there's a subtle regex difference I'm missing.
    // Original: /^(?!(?:\w+:)?\/\/)/ 
    // Mutated:  /^(?!(?:\w:)?\/\/)/
    // The difference: \w+ vs \w (one or more vs exactly one)
    // For "http://": original lookahead (?:\w+:)?\/\/ = "http://" matches -> don't prepend
    // For "http://": mutated lookahead (?:\w:)?\/\/ = "h://" doesn't match "http://" -> prepend!
    // Wait, \w: matches exactly one word char + colon. "http:" has 4 chars before colon.
    // So mutated would NOT recognize "http://" as already having a protocol!
    // But "http://..." would be caught by outer \w+: check... 
    // UNLESS the outer check also has this issue? No, outer uses \w+: which is correct.
    
    // So the scenario: a URL that somehow gets past the outer \w+: check but still has http://
    // That seems impossible since outer correctly uses \w+:.
    
    // I think I need to just write a test that exercises the code path and trust that
    // the mutation matters. Let me look at what "google.com" does step by step with both versions.
    // "google.com" -> no //, no #, no baseUrl
    // outer: /^\.*\/|^(?!localhost)\w+:/.test("google.com") 
    //   ^\.*\/ : "google.com" doesn't start with optional-dots-then-slash -> no
    //   ^(?!localhost)\w+: : "google" then "." - \w+ matches "google" but then needs ":" -> "." != ":" -> no
    //   -> outer = false -> !outer = true -> ENTER block
    // Inside original: "google.com".replace(/^(?!(?:\w+:)?\/\/)/, 'http://')
    //   lookahead: (?:\w+:)?\/\/ - optional \w+: then //
    //   At position 0 of "google.com": try \w+: = "google" then needs ":" but gets "." -> \w+: fails
    //   optional so skip, then try // -> "go" != "//" -> lookahead fails -> negative lookahead succeeds -> replace!
    //   Result: "http://google.com"
    // Inside mutated: "google.com".replace(/^(?!(?:\w:)?\/\/)/, 'http://')  
    //   Same logic, \w: = "g" then ":" but "o" != ":" -> fails, optional skip, // fails -> replace!
    //   Result: "http://google.com"
    // Same result! So "google.com" gives same result with both.
    
    // I'm now thinking the mutation is truly unreachable in normal usage.
    // But the problem states it IS a mutation that should be detectable.
    // Let me think harder...
    
    // What about a URL like "a://example.com"?
    // Step 1: replace /^\/\// -> no change (doesn't start with //)
    // Step 2: remove hash -> no change
    // No baseUrl, so check outer: /^\.*\/|^(?!localhost)\w+:/.test("a://example.com")
    //   ^(?!localhost)\w+: -> "a" matches \w+, then ":" matches -> MATCHES
    //   -> outer = true -> !outer = false -> SKIP block
    // Then URL.parse("a://example.com") -> protocol = "a:" -> not http/https -> return null
    // Both versions return null. Same.
    
    // What about a URL that starts with exactly one word char + "://"?
    // Like "a://example.com" - handled above, outer catches it.
    
    // I'm going in circles. Let me try a completely different approach.
    // Maybe the test should use a URL where the outer regex DOESN'T catch it,
    // but the inner regex SHOULD catch it in original but DOESN'T in mutated.
    // For that, we need: outer \w+: doesn't match, but inner \w+:// should match.
    // But if \w+: doesn't match at start, then \w+:// also can't match at start.
    // So this is logically impossible.
    
    // UNLESS... the outer regex has a different structure. Let me re-read:
    // /^\.*\/|^(?!localhost)\w+:/
    // The (?!localhost) is a negative lookahead! So for "localhost:8080":
    // ^(?!localhost)\w+: -> at start, lookahead checks if next is "localhost" -> it IS -> lookahead FAILS
    // So "localhost:8080" does NOT match the outer regex!
    // -> !outer = true -> ENTER block
    // Inside original: /^(?!(?:\w+:)?\/\/)/ on "localhost:8080"
    //   lookahead: \w+: = "localhost:" then // -> "80" != "//" -> lookahead fails -> prepend!
    //   Result: "http://localhost:8080"
    // Inside mutated: /^(?!(?:\w:)?\/\/)/ on "localhost:8080"
    //   lookahead: \w: = "l:" -> "o" != ":" -> fails, optional skip, // -> "lo" != "//" -> prepend!
    //   Result: "http://localhost:8080"
    // Same again!
    
    // What about "localhost://something"?
    // Outer: ^(?!localhost)\w+: -> lookahead sees "localhost" -> FAILS -> outer doesn't match
    // -> enter block
    // Original inner: lookahead \w+:// -> "localhost://" matches! -> don't prepend
    // Mutated inner: lookahead \w:// -> "l://" -> "l" then ":" but next is "o" not ":" -> fails
    //   optional skip, then // -> "lo" != "//" -> prepend!
    //   Result: "http://localhost://something" 
    // DIFFERENT BEHAVIOR!
    
    // So "localhost://something" would behave differently!
    // Original: doesn't prepend (recognizes localhost:// as protocol-like)
    // Mutated: prepends http://, giving "http://localhost://something"
    
    // Let's verify what parse returns for "localhost://something":
    // Original: currentUrlStr stays "localhost://something"
    //   URL.parse("localhost://something") -> protocol = "localhost:" -> not http/https -> return null
    // Mutated: currentUrlStr becomes "http://localhost://something"  
    //   URL.parse("http://localhost://something") -> this is weird URL
    //   Actually URL.parse might parse this as http: protocol with host "localhost" and path "://something"
    //   Hmm, or it might fail. Let me think...
    //   Actually "http://localhost://something" - URL.parse would see http: protocol, host = localhost, path = ://something
    //   protocol = "http:" -> passes the protocol check
    //   host = "localhost" -> psl.parse("localhost") -> domain might be null or "localhost"
    //   This would NOT return null!
    
    // So: parse("localhost://something") 
    //   Original: returns null (invalid protocol "localhost:")
    //   Mutated: returns non-null object with url = "http://localhost://something" or similar
    
    // This is the detectable difference! Let me write the test.
    
    const result = parse("localhost://something");
    expect(result).toBeNull();
  });
});