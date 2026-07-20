import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract deduplication of duplicate URLs', () => {
  it('should deduplicate URLs with the same href and merge their text content', () => {
    const html = `
      <html>
        <body>
          <a href="http://www.example.com/page">First Link</a>
          <a href="http://www.example.com/page">Second Link</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://www.example.com/");

    // With the original code, duplicate URLs are merged into one entry
    // with combined text. With the mutated code (if (false)), the
    // urlMap.has() check never runs, so every occurrence overwrites
    // the previous entry without merging text.
    // The key observable difference: only one URL entry should exist
    // (deduplication), and its text should contain both link texts.
    const pageEntries = result.filter((el: any) => el.url === "http://www.example.com/page");
    
    expect(pageEntries.length).toBe(1);
    expect(pageEntries[0].text).toContain("First Link");
    expect(pageEntries[0].text).toContain("Second Link");
  });
});