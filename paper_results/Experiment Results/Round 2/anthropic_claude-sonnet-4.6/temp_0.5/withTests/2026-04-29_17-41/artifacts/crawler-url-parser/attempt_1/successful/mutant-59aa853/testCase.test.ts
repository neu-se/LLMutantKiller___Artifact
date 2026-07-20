import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function text concatenation for duplicate URLs', () => {
  it('should concatenate text from duplicate anchor tags pointing to the same URL', () => {
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
    // In the original code, when a duplicate URL is found and the text is not already included,
    // it concatenates the new text. With the mutation (if (false)), the text is never concatenated.
    expect(pageUrl!.text).toContain("First Text");
    expect(pageUrl!.text).toContain("Second Text");
  });
});