import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with 3-character href", () => {
  it("should include links with href of exactly 3 characters", () => {
    // href "abc" has length 3 - original code allows it (< 3 is false), mutant skips it (<= 3 is true)
    const html = '<html><body><a href="abc">Link</a></body></html>';
    const sourceUrl = "http://example.com/page/";
    
    const results = extract(html, sourceUrl);
    
    // With original code: href "abc" (length 3) passes the filter (3 < 3 is false)
    // and resolves to "http://example.com/page/abc"
    // With mutated code: href "abc" (length 3) is filtered out (3 <= 3 is true)
    // so results should be empty
    
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(r => r.url.includes("abc"))).toBe(true);
  });
});