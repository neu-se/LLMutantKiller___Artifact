import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text handling", () => {
  it("should handle empty text in anchor elements", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/test"></a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";
    const result = extract(html, baseUrl);

    expect(result[0].text).toStrictEqual("");
  });
});