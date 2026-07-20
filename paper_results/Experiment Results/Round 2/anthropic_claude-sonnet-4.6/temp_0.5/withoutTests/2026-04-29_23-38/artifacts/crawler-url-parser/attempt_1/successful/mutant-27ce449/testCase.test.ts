import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle links that parse to null without throwing an error", () => {
    // A URL with illegal characters (spaces) will cause parse() to return null
    // Original code: if (currentUrl && currentUrl.url) - safely skips null
    // Mutated code: if (true) - tries to access currentUrl.url on null, throws TypeError
    const html = `
      <html>
        <body>
          <a href="https://example.com/path with spaces">Invalid URL</a>
          <a href="https://valid.com/page">Valid URL</a>
        </body>
      </html>
    `;
    const sourceUrl = "https://example.com/";
    
    // Original code handles null currentUrl gracefully
    // Mutated code throws TypeError: Cannot read property 'url' of null
    expect(() => {
      const result = extract(html, sourceUrl);
      expect(Array.isArray(result)).toBe(true);
    }).not.toThrow();
  });
});