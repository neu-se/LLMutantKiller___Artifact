import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text assignment", () => {
  it("should correctly assign link text to currentUrl.text when text is not null", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1">Link Text</a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";
    const result = extract(html, baseUrl);
    expect(result[0].text).toBe("Link Text");
  });
});