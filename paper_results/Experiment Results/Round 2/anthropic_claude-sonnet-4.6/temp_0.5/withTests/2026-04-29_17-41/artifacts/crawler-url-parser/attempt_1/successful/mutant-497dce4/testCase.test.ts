import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract deduplication behavior', () => {
  it('should merge text from duplicate URLs rather than creating duplicate entries', () => {
    // Create HTML with two anchor tags pointing to the same URL but with different text
    const html = `
      <html>
        <body>
          <a href="http://www.example.com/page">First Link Text</a>
          <a href="http://www.example.com/page">Second Link Text</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://www.example.com/");

    // Find the entry for the duplicate URL
    const pageEntries = result.filter((el: any) => el.url === "http://www.example.com/page");

    // With the original code, duplicate URLs are merged into one entry with combined text
    // With the mutated code (if (false)), the urlMap.has check never runs,
    // so the second occurrence overwrites the first, resulting in only one entry
    // but the text would only contain "Second Link Text" instead of the merged text

    // The original code merges text: "First Link Text Second Link Text"
    // The mutated code would just have "Second Link Text" (overwrites)
    expect(pageEntries.length).toBe(1);
    expect(pageEntries[0].text).toContain("First Link Text");
    expect(pageEntries[0].text).toContain("Second Link Text");
  });
});