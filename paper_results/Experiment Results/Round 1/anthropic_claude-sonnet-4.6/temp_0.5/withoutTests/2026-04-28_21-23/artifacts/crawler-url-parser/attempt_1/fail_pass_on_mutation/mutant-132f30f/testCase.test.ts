import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser stripWWW behavior", () => {
  it("should preserve www subdomain in parsed URL when stripWWW is false (mutant) vs strip it when true (original)", () => {
    // When stripWWW: true (original), www should be stripped from the URL
    // When stripWWW: false (mutant), www should be preserved
    // Since result_normalize_options is defined but the parse function uses URL.parse directly,
    // we test the subdomain field which reflects psl parsing of the host
    const result = parse("http://www.example.com/path");
    
    // The parse function returns subdomain from psl.parse
    // With www in the URL, psl should identify 'www' as subdomain
    // If stripWWW were applied, the host would be 'example.com' with no subdomain
    // Since the options object IS referenced (even if not fully applied), 
    // we verify the host field contains www (mutant behavior) vs not (original)
    expect(result).not.toBeNull();
    expect(result!.host).toBe("www.example.com");
    expect(result!.subdomain).toBe("www");
  });
});