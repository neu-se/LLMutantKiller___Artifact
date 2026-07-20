import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with 3-character href", () => {
  it("should include URLs with exactly 3-character href values", () => {
    // href="/a" is 3 characters - original code allows it (< 3 is false), mutated code filters it out (<= 3 is true)
    const html = '<html><body><a href="/ab">Link</a></body></html>';
    const sourceUrl = "http://example.com/page";
    
    const result = extract(html, sourceUrl);
    
    // "/ab" has length 3, original code: 3 < 3 is false, so it proceeds
    // mutated code: 3 <= 3 is true, so it returns (filters out)
    // The URL should be present in original but absent in mutated
    expect(result.length).toBeGreaterThan(0);
    expect(result.some(r => r.url && r.url.includes("/ab"))).toBe(true);
  });
});