import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with null text handling", () => {
  it("should correctly handle empty text in anchor elements", () => {
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
    expect(result[0].url).toBe("http://example.com/page1");
    expect(result[0].text).toBe("");
  });
});