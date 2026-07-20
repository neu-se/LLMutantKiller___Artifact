import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle links with empty text content correctly", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1"></a>
          <a href="http://example.com/page2">Text</a>
        </body>
      </html>
    `;

    const results = extract(html, "http://example.com");
    const emptyTextLink = results.find(r => r.url === "http://example.com/page1");

    expect(emptyTextLink).toBeDefined();
    expect(emptyTextLink?.text).toBeFalsy();
  });
});