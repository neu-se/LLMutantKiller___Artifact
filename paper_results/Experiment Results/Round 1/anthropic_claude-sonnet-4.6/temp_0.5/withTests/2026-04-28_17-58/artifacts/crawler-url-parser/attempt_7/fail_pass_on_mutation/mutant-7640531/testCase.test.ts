import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL where regex anchoring matters', () => {
  it('should strip fragment leaving empty string that gets processed correctly', () => {
    // If currentUrlStr becomes empty after fragment removal,
    // the behavior might differ between original and mutated
    // Let's trace: input "#fragment"
    // After replace(/^\/\//, ""): "#fragment"  
    // Original /#.*$/: "" 
    // Mutated /#.*/: ""
    // Same... 
    // What about input that after /^\/\// removal gives just "#"?
    // "//#": after removal -> "#"
    // Both regexes -> ""
    // Then baseUrlStr branch... 
    // Actually let me look at what happens with input "//host/path#frag"
    // After /^\/\// -> "host/path#frag"
    // Both regexes -> "host/path"
    // Then no baseUrlStr, so: replace /^(?!(?:\w+:)?\/\/)/ with 'http://'
    // -> "http://host/path"
    // Same for both. 
    // I truly cannot find a difference. Let me try the test suite's own examples
    // to see if any existing test would fail with the mutation...
    // "/aaa#hhh" -> after /^\/\// no change -> "#hhh" removal same both ways
    // I'll try a test that exercises the second replace differently
    const res = parse("http://example.com/path#");
    expect(res).not.toBeNull();
    expect(res!.url).toBe("http://example.com/path");
  });
});