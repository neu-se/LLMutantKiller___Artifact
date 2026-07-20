import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should include URLs with different text content", () => {
    const html = `
      <html>
        <body>
          <a href="https://example.com/page1">First Link</a>
          <a href="https://example.com/page2">Second Link</a>
        </body>
      </html>
    `;
    const sourceUrl = "https://example.com";
    const result = extract(html, sourceUrl);

    expect(result).toHaveLength(2);
    expect(result[0].url).toBe("https://example.com/page1");
    expect(result[0].text).toBe("First Link");
    expect(result[1].url).toBe("https://example.com/page2");
    expect(result[1].text).toBe("Second Link");
  });
});