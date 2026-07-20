import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should not include links with href shorter than 3 characters", () => {
    const html = `
      <html>
        <body>
          <a href="ab">Short link</a>
          <a href="http://example.com/valid-link">Valid Link</a>
        </body>
      </html>
    `;
    
    const results = extract(html, "http://example.com/");
    
    // The "ab" href (length < 3) should be filtered out and not cause errors
    // In the mutated code, "ab" won't be filtered and parse("ab", baseUrl) will be attempted
    // which could produce unexpected results or include it in the output
    // In original code, href.length < 3 check filters it out before parsing
    
    // With the mutation (if false) return, the short href "ab" will be processed
    // parse("ab", "http://example.com/") would resolve to "http://example.com/ab"
    // So in mutated code, results would include that resolved URL
    const shortResolvedLinks = results.filter((r: any) => r.url && r.url === "http://example.com/ab");
    expect(shortResolvedLinks.length).toBe(0);
  });
});