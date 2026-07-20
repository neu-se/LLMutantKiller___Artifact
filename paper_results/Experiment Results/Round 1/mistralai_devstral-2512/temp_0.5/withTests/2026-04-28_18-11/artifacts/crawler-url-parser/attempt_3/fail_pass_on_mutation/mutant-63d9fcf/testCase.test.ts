import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with duplicate URLs", () => {
  it("should handle duplicate URLs with same text content", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1">Same Text</a>
          <a href="http://example.com/page1">Same Text</a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";
    const result = extract(html, baseUrl);

    // Should include the URL
    const urls = result.map(r => r.url);
    expect(urls).toContain("http://example.com/page1");

    // Original code: should have exactly one entry (duplicate filtered out)
    // Mutated code: would have two entries (duplicate not filtered)
    const page1Entries = result.filter(r => r.url === "http://example.com/page1");
    expect(page1Entries.length).toBe(1);
  });
});