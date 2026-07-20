import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function href length filtering", () => {
  it("should filter out href values with length less than 3", () => {
    const html = `
      <html>
        <body>
          <a href="/a">Short link</a>
          <a href="http://example.com/valid">Valid link</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com/page";
    
    const results = extract(html, sourceUrl);
    
    // The href "/a" has length 2, which is less than 3
    // In original code: filtered out (href.length < 3 returns true)
    // In mutated code: NOT filtered out (false always returns false, so it proceeds)
    const urls = results.map((r: any) => r.url);
    
    // "/a" resolved against "http://example.com/page" would be "http://example.com/a"
    // This should NOT be in results in original code
    expect(urls).not.toContain("http://example.com/a");
    
    // The valid link should still be present
    expect(urls).toContain("http://example.com/valid");
  });
});