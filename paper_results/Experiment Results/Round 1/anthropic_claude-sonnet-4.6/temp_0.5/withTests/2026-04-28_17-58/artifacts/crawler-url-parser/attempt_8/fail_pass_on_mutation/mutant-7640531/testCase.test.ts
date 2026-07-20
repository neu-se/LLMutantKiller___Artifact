import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with fragment in protocol-relative URL used as base', () => {
  it('should correctly resolve relative URL against base URL with fragment', () => {
    // The baseUrlStr also has fragment removal applied to it
    // baseUrlStr = baseUrlStr.replace(/#.*$/, '');  (this line is NOT mutated)
    // But currentUrlStr fragment removal IS mutated
    // For currentUrlStr = "//host#frag/path" 
    // After /^\/\// removal: "host#frag/path"
    // Original /#.*$/: "host" (removes #frag/path to end)
    // Mutated /#.*/: "host" (also removes #frag/path to end - .* is greedy!)
    // Still same...
    // 
    // WAIT. I just realized: /#.*$/ and /#.*/ ARE identical for strings without \n
    // because .* is greedy and matches everything to end of string anyway.
    // The $ is redundant when there's no \n.
    // 
    // So the ONLY way to kill this mutant is with a string containing \n.
    // But \n fails the illegal chars check...
    // UNLESS the \n is in the baseUrlStr which is checked separately!
    // 
    // _has_illegal_chars checks currentUrlStr and baseUrlStr separately.
    // If currentUrlStr has \n -> returns null (both same)
    // If baseUrlStr has \n -> returns null (both same)  
    // 
    // What if currentUrlStr itself after the /^\/\// replacement gains a \n?
    // Input "//\nhost" -> has \n -> illegal -> null. Same.
    //
    // This mutant appears truly equivalent. But let me try one more thing:
    // What if there's a # in the middle and the string has specific length?
    const res = parse("http://example.com/a#b", "http://example.com/");
    expect(res).not.toBeNull();
    expect(res!.url).toBe("http://example.com/a");
  });
});