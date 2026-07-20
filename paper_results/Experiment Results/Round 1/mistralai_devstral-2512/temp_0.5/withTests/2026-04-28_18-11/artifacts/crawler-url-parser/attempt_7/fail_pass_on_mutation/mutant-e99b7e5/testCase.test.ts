import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text handling", () => {
  it("should preserve empty text and not modify it", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1"></a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";
    const result = extract(html, baseUrl);

    expect(result.length).toBe(1);
    expect(result[0].text).toBe("");
    expect(result[0].text.length).toBe(0);
  });
});