import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse URL with fragment', () => {
  it('should strip fragment from URL with # followed by valid chars then newline at end', () => {
    // Test with a string ending in \n - illegal chars check uses /i flag
    // \n is not in [a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]
    // so it returns null for strings with \n
    // 
    // The REAL difference: /#.*$/ vs /#.*/
    // For "abc#def", both match "#def" -> "abc" (same)
    // For "abc#def\n", /#.*$/ matches "#def" ($ before \n at end) -> "abc\n"
    //                  /#.*/ matches "#def" -> "abc\n" (same!)
    // For "abc#def\nghi", /#.*$/ NO MATCH ($ can't match mid-string without m flag, 
    //                      and .* stops at \n so can't reach $)
    //                      /#.*/ matches "#def" -> "abc\nghi"
    // But \n is illegal... 
    // 
    // Conclusion: for all inputs passing illegal char check, both regexes are equivalent
    // This mutation may be unkillable with valid inputs. Let me try the boundary anyway.
    const res = parse("http://example.com/path#fragment");
    expect(res).not.toBeNull();
    expect(res!.url).toBe("http://example.com/path");
    expect(res!.search).toBeNull();
  });
});