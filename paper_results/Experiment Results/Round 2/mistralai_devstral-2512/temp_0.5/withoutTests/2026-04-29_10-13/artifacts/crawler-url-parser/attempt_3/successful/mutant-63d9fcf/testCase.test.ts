import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle duplicate URLs with same text by not adding them", () => {
    const html = `
      <html>
        <body>
          <a href="https://example.com/page1">Same Text</a>
          <a href="https://example.com/page1">Same Text</a>
        </body>
      </html>
    `;
    const sourceUrl = "https://example.com";
    const result = extract(html, sourceUrl);

    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("https://example.com/page1");
    expect(result[0].text).toBe("Same Text");
  });
});