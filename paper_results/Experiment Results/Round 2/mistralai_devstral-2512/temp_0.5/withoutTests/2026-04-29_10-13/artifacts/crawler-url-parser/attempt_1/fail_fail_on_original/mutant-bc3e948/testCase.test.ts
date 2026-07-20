import { extract } from "./crawler-url-parser.js";

describe("extract function", () => {
  it("should correctly handle text extraction from anchor tags", () => {
    const html = `
      <html>
        <body>
          <a href="https://example.com/page1">Link Text</a>
          <a href="https://example.com/page2"></a>
        </body>
      </html>
    `;
    const sourceUrl = "https://example.com";
    const result = extract(html, sourceUrl);

    expect(result).toHaveLength(2);
    expect(result[0].text).toBe("Link Text");
    expect(result[1].text).toBe("");
  });
});