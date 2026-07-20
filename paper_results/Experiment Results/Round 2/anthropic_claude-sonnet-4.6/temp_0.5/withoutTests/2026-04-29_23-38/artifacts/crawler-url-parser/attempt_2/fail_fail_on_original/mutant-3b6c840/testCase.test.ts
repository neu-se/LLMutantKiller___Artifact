import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract trailing slash normalization", () => {
  it("should remove trailing slashes from extracted URLs when removeTrailingSlash is true", () => {
    // A page with a link that has a trailing slash
    const html = '<a href="http://example.com/about/">About</a>';
    const sourceUrl = "http://example.com/";
    
    const results = extract(html, sourceUrl);
    
    // With removeTrailingSlash: true (original), the URL should NOT have trailing slash
    // With removeTrailingSlash: false (mutant), the URL WOULD have trailing slash
    expect(results.length).toBeGreaterThan(0);
    const aboutUrl = results.find(r => r.url.includes("about"));
    expect(aboutUrl).toBeDefined();
    // Original: trailing slash removed -> "http://example.com/about"
    // Mutant: trailing slash kept -> "http://example.com/about/"
    expect(aboutUrl!.url).toBe("http://example.com/about");
  });
});