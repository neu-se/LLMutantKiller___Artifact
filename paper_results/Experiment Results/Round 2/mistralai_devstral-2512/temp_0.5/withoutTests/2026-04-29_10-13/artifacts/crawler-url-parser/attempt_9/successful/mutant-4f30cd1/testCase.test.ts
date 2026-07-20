import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle undefined href attributes with protocol-like text", () => {
    const html = `
      <html>
        <body>
          <a href>Empty href</a>
          <a href="javascript">JS-like text</a>
        </body>
      </html>
    `;
    const sourceUrl = "https://example.com";
    const result = extract(html, sourceUrl);
    expect(result).toHaveLength(0);
  });
});