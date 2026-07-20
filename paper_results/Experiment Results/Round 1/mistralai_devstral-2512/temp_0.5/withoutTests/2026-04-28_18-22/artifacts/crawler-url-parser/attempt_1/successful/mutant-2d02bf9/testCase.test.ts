import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should combine text from multiple links with the same URL", () => {
    const html = `
      <html>
        <body>
          <a href="https://example.com/page1">First Link</a>
          <a href="https://example.com/page1">Second Link</a>
        </body>
      </html>
    `;
    const sourceUrl = "https://example.com";
    const result = extract(html, sourceUrl);

    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("https://example.com/page1");
    expect(result[0].text).toBe("First Link Second Link");
  });
});