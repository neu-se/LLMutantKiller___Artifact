import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe("extract function with undefined href", () => {
  it("should skip anchor elements with undefined href without throwing an error", () => {
    // In the original code, the check is `typeof href == "undefined"` which correctly
    // handles the case when href is undefined (e.g., <a> without href attribute).
    // In the mutated code, the check is `typeof href == ""` which is never true,
    // so when href is undefined, calling href.length will throw a TypeError.
    
    const html = `
      <html>
        <body>
          <a>No href anchor</a>
          <a href="http://example.com/page">Valid link</a>
        </body>
      </html>
    `;
    
    // Original code should handle undefined href gracefully and return only valid links
    // Mutated code will throw TypeError when accessing .length on undefined href
    const result = extract(html, "http://example.com/");
    
    // Should return the valid link without throwing
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0].url).toContain("example.com");
  });
});