import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function - duplicate URL text merging", () => {
  it("should merge text from duplicate URLs into a single entry with combined text", () => {
    // Create HTML with two anchor tags pointing to the same URL but with different text
    const html = `
      <html>
        <body>
          <a href="http://example.com/page">First Link Text</a>
          <a href="http://example.com/page">Second Link Text</a>
        </body>
      </html>
    `;
    
    const sourceUrl = "http://example.com/";
    const results = extract(html, sourceUrl);
    
    // Find the entry for the duplicate URL
    const pageEntry = results.find((r: any) => r.url && r.url.includes("example.com/page"));
    
    // In the original code, when the same URL appears twice, the text should be merged
    // The second occurrence should append its text to the first
    // In the mutated code (if (false)), the duplicate URL handling is skipped,
    // so the second occurrence would overwrite the first entry's text
    expect(pageEntry).toBeDefined();
    
    // The original code merges text: "First Link Text Second Link Text"
    // The mutated code would just have the last entry set: "Second Link Text"
    // We verify that both texts are present in the merged result
    expect(pageEntry!.text).toContain("First Link Text");
    expect(pageEntry!.text).toContain("Second Link Text");
  });
});