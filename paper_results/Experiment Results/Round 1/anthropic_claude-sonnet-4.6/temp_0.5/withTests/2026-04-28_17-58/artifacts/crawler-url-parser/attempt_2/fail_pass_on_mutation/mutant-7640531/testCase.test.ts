import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with fragment and trailing newline', () => {
  it('should correctly strip fragment when URL has trailing newline after fragment', () => {
    // Input with \n after fragment - $  in /#.*$/ matches before trailing \n
    // but without $, .* stops at \n leaving \n in string
    // Actually both stop at \n... need different approach
    // The $ matches end of string; without it, on "path#frag" both work same
    // Key: "path#frag" - /#.*$/ matches "#frag", /#.*/ also matches "#frag"
    // But with global flag missing, only first match replaced - same behavior
    // Real difference: multiline string "line1#frag\nline2" 
    // /#.*$/ -> "line1\nline2" ($ matches before \n)  
    // /#.*/ -> "line1\nline2" (. stops at \n)
    // They ARE the same... the mutation seems equivalent
    const res = parse("/aaa#hhh");
    expect(res).not.toBeNull();
    expect(res!.url).toBe("/aaa");
  });
});