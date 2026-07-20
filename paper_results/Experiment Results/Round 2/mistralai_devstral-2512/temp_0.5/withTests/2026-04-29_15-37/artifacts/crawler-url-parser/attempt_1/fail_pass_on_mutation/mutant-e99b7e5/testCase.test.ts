import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text handling", () => {
  it("should handle empty link text correctly", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1">Link with text</a>
          <a href="http://example.com/page2"></a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";
    const result = extract(html, baseUrl);

    // Find the link with empty text
    const emptyTextLink = result.find(link => link.url === "http://example.com/page2");

    // The text should be an empty string, not "Stryker was here!"
    expect(emptyTextLink?.text).toBe("");
  });
});