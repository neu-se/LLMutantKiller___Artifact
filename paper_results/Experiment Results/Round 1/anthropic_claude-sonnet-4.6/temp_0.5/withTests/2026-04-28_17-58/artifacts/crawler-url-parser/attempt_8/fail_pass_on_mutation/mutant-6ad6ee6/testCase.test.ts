import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL where fragment affects protocol regex', () => {
  it('should correctly add http protocol when URL has no protocol but has multi-char fragment', () => {
    // No base URL case - the else branch runs:
    // if (!/^\.*\/|^(?!localhost)\w+:/.test(currentUrlStr)) add http://
    // "aaa.com#bc" - original removes fragment first -> "aaa.com", regex doesn't match -> adds http://
    // Mutated: "aaa.com#bc" stays (/#.$/ doesn't match 2-char fragment)
    // regex test on "aaa.com#bc": !/^\.*\/|^(?!localhost)\w+:/.test("aaa.com#bc")
    // \w+: needs colon - not present. ^\.*\/ needs dot-slash - not present
    // So http:// still added -> "http://aaa.com#bc"
    // URL.parse -> hash="#bc", delete hash -> format -> "http://aaa.com/"
    // Hmm still same...
    
    // What about currentUrlStr used in URL.resolve? Let me check the second URL.parse
    // after the if block: parsedUrl = URL.parse(currentUrlStr, true, true)
    // currentUrlStr was set to URL.format(absoluteUrl) which already has no hash
    // For non-relative URLs, currentUrlStr still has the hash if mutated
    // parsedUrl = URL.parse("http://aaa.com#bc") -> hash="#bc"  
    // delete parsedUrl.hash -> format -> "http://aaa.com/"
    // ret.url = URL.format(parsedUrl) -> "http://aaa.com/"
    // Still same result!
    const result = parse("aaa.com#bc");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://aaa.com/");
  });
});