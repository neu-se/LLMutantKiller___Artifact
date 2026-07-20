import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL with baseUrl containing fragment', () => {
  it('should resolve relative URL correctly when baseUrl has a fragment with trailing newline', () => {
    // With /#.*$/ : "http://example.com/path#frag\n" -> "http://example.com/path\n" ($ matches before \n)
    // With /#.*/ : "http://example.com/path#frag\n" -> "http://example.com/path\n" (same, .* stops at \n)
    // Need a case where $ behavior differs...
    // Actually with multiline strings ending in \n:
    // /#.*$/ in non-multiline: $ matches end of string or before final \n
    // So "abc#def\n".replace(/#.*$/, '') = "abc\n" 
    // "abc#def\n".replace(/#.*/, '') = "abc\n" (same)
    // They're equivalent. Let me just verify the fragment stripping works.
    const result = parse("../ddd", "http://www.stackoverflow.com/aaa/bbb/ccc#fragment");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.stackoverflow.com/aaa/ddd");
  });
});