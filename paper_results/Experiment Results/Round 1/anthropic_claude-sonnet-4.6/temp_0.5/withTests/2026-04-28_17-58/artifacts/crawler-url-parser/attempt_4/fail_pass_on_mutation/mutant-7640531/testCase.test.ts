import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL fragment removal order', () => {
  it('should correctly handle URL where // prefix removal creates fragment scenario', () => {
    // After removing leading //, "//path#frag" becomes "path#frag"  
    // Then /#.*$/ removes "#frag" -> "path"
    // Then second /#.*$/ is no-op
    // With mutation /#.*/ same result
    // Need to find where $ actually matters...
    // $ without m flag: matches end of string
    // Without $: .* is greedy, matches to end anyway for strings without \n
    // For "abc#def": both match "#def" -> "abc"
    // TRULY equivalent for \n-free strings
    // The only difference: string ending with \n
    // "abc#def\n": /#.*$/ matches "#def" ($ before \n), result "abc\n"  
    //              /#.*/ matches "#def" (. stops at \n), result "abc\n"
    // SAME! Both stop at \n.
    // I need to accept this might need a creative approach
    // What if currentUrlStr after // removal ends with \n?
    // Input "//host#frag\n" - but \n is illegal char
    // What about encoded \n = %0A? That's legal chars...
    const res = parse("http://www.example.com/path%0A#section");
    expect(res).not.toBeNull();
    expect(res!.url).toBe("http://www.example.com/path%0A");
  });
});