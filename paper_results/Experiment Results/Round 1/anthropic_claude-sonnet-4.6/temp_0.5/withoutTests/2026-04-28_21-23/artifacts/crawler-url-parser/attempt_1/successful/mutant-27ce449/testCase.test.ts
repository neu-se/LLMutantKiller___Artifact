import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with invalid URLs", () => {
  it("should handle hrefs that cause parse to return null without throwing", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/valid-link">Valid Link</a>
          <a href="http://example.com/path with spaces">Invalid Link</a>
        </body>
      </html>
    `;
    
    // Original code: skips null currentUrl, returns only valid URLs
    // Mutated code: tries to access null.url, throws TypeError
    expect(() => {
      const result = extract(html, "http://example.com/");
      // Should only contain the valid URL
      expect(result.length).toBe(1);
      expect(result[0].url).toContain("valid-link");
    }).not.toThrow();
  });
});