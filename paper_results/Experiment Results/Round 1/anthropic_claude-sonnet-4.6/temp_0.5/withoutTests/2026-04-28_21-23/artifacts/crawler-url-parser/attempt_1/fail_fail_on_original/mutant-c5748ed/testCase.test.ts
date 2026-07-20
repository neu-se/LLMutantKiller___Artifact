import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with default index paths", () => {
  it("should return 'samelevel' when linkurl ends with /default.html and pageurl has same base path", () => {
    // linkurl_path = "/section/default.html" -> after replace -> "" (original) vs "/" (mutated)
    // pageurl_path = "/section/page.html" -> after replace -> "/section"
    // With original: linkurl_path becomes "/section" (empty string replacement removes /default.html)
    // The comparison logic differs between original and mutated
    
    // Use a case where /default.html normalization matters
    // linkurl: http://example.com/section/default.html
    // pageurl: http://example.com/section/about.html
    // Original: linkurl_path "/section/default.html" -> "/section" (replace with "")
    // Mutated:  linkurl_path "/section/default.html" -> "/section/" (replace with "/")
    
    const result = gettype(
      "http://example.com/section/default.html",
      "http://example.com/section/about.html"
    );
    
    // With original code: both paths normalize to "/section", samelevel
    // With mutated code: linkurl becomes "/section/", pageurl becomes "/section", different behavior
    expect(result).toBe("samelevel");
  });
});