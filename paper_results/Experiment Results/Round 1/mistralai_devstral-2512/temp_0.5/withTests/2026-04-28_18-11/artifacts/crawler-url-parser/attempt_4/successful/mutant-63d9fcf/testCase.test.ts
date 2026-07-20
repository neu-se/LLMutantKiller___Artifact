import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function duplicate URL handling", () => {
  it("should filter out duplicate URLs with identical text", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1">Test Link</a>
          <a href="http://example.com/page1">Test Link</a>
          <a href="http://example.com/page2">Another Link</a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";
    const result = extract(html, baseUrl);

    // Should contain both unique URLs
    const urls = result.map(r => r.url);
    expect(urls).toContain("http://example.com/page1");
    expect(urls).toContain("http://example.com/page2");

    // Original: should have 2 entries (duplicate filtered)
    // Mutated: would have 3 entries (duplicate not filtered)
    expect(result.length).toBe(2);

    // Verify the duplicate was filtered
    const page1Entries = result.filter(r => r.url === "http://example.com/page1");
    expect(page1Entries.length).toBe(1);
    expect(page1Entries[0].text).toBe("Test Link");
  });
});