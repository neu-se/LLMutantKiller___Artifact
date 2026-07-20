import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function text concatenation for duplicate URLs', () => {
  it('should concatenate text from multiple anchor tags pointing to the same URL', () => {
    const html = `
      <html>
        <body>
          <a href="http://www.example.com/page">First Text</a>
          <a href="http://www.example.com/page">Second Text</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://www.example.com/");
    const pageUrl = result.find((el: any) => el.url === "http://www.example.com/page");

    expect(pageUrl).toBeDefined();
    // In the original code, when the same URL appears twice with different texts,
    // the second text should be appended to the first (if not already included).
    // The mutated code uses `if (false)` so the text never gets concatenated.
    expect(pageUrl!.text).toContain("First Text");
    expect(pageUrl!.text).toContain("Second Text");
  });
});