import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle links with unsupported protocols without throwing an error", () => {
    const html = '<html><body><a href="tel:1234567890">Call us</a></body></html>';
    const sourceUrl = "http://example.com";
    
    // Original code: currentUrl is null, condition is false, skips gracefully
    // Mutated code: null || null.url throws TypeError
    expect(() => extract(html, sourceUrl)).not.toThrow();
    const result = extract(html, sourceUrl);
    expect(result).toEqual([]);
  });
});