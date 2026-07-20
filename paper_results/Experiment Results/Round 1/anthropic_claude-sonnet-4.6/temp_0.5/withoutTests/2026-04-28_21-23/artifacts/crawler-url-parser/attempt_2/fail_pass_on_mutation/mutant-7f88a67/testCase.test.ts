import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with HTTPS source URL", () => {
  it("should preserve https protocol in extracted URLs when source is https", () => {
    const html = '<a href="https://example.com/page">Link</a>';
    const sourceUrl = "https://example.com";
    const results = extract(html, sourceUrl);
    
    // With normalizeHttps: false (original), https URLs should remain https
    // With normalizeHttps: true (mutant), https URLs would be converted to http
    const httpsLinks = results.filter((r: any) => r.url.startsWith("https://"));
    expect(httpsLinks.length).toBeGreaterThan(0);
  });
});