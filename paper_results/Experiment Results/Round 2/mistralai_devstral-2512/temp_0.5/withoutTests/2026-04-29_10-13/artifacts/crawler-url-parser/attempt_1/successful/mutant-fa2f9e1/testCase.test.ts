import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should correctly handle null text in anchor elements", () => {
    const html = `
      <html>
        <body>
          <a href="https://example.com/page1">Link with text</a>
          <a href="https://example.com/page2"></a>
        </body>
      </html>
    `;
    const baseUrl = "https://example.com";
    const result = extract(html, baseUrl);

    expect(result).toHaveLength(2);
    expect(result[0].text).toBe("Link with text");
    expect(result[1].text).toBe(""); // This will fail in the mutated version
  });
});