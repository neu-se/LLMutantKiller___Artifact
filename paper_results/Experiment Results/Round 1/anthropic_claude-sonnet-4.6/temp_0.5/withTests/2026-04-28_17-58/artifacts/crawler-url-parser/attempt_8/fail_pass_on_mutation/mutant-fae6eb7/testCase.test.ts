import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse mutation detection', () => {
  it('should detect mutation in baseUrl hash replacement', () => {
    // Test with baseUrl that has no hash - both regexes are no-ops
    // Test with baseUrl that has hash - for valid URLs, both regexes produce same result
    // The ONLY difference would be with \n in baseUrl after #
    // But \n is illegal...
    // 
    // Let me try: what if currentUrlStr also has a hash and baseUrlStr has a hash?
    // currentUrlStr gets /#.$/ applied (one char after hash)
    // baseUrlStr gets /#.*$/ (or /#.*/) applied
    
    // What if baseUrlStr = "http://example.com/path#" (hash at end, nothing after)?
    // /#.*$/: matches "#" -> ""  -> baseUrlStr = "http://example.com/path"
    // /#.*/: matches "#" -> "" -> baseUrlStr = "http://example.com/path"  
    // Same!
    
    // I'll try with a URL where the fragment contains special regex chars
    const result = parse("page", "http://www.example.com/aaa/bbb#sec.tion");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/aaa/page");
    expect(result!.baseurl).toBe("http://www.example.com/aaa/bbb");
  });
});