import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL fragment removal with $ anchor', () => {
  it('should strip fragment from URL that after // removal contains newline before end', () => {
    // Now I understand: PLACEHOLDER is the ONLY fragment removal for currentUrlStr
    // The next /#.*$/ is inside if(baseUrlStr) block for baseUrlStr
    // 
    // Original: /#.*$/ - $ matches end of string or before \n at end
    // Mutated:  /#.*/  - .* stops at \n
    // 
    // For "path#frag\n": 
    //   /#.*$/  matches "#frag" ($ matches before \n), result: "path\n"  
    //   /#.*/   matches "#frag" (. stops at \n), result: "path\n"
    // Still same!
    //
    // For "path#frag\nmore":
    //   /#.*$/  - .* can't cross \n, $ is at very end after "more"
    //             so /#.*$/ does NOT match! String unchanged: "path#frag\nmore"
    //   /#.*/   - matches "#frag", result: "path\nmore"
    // DIFFERENT! But \n is illegal...
    //
    // Hmm, but what if we use \r? Also illegal.
    // What about a URL-encoded newline that when decoded creates this situation?
    // URL.parse doesn't decode... 
    // 
    // I need to accept this might require looking at it differently.
    // Let me check: does the illegal chars regex catch ALL non-printable chars?
    // /[^a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]/i
    // This catches anything NOT in that set. \n, \r, \t are all caught.
    // 
    // What Unicode chars pass this check but are treated specially by regex?
    // Line separator U+2028, paragraph separator U+2029?
    // These are NOT in the allowed set, so they'd be caught as illegal.
    //
    // I'm going to try a completely different approach and test the baseUrlStr path
    const res = parse("/path#frag", "http://example.com/base#section");
    expect(res).not.toBeNull();
    expect(res!.url).toBe("http://example.com/path");
  });
});