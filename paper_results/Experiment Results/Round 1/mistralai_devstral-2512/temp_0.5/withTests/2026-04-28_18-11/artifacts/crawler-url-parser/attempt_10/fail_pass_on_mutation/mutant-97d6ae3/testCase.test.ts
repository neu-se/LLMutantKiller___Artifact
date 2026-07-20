import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with null currentUrl", () => {
  it("should handle null currentUrl in the placeholder condition", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1">First</a>
          <a href="http://example.com/page1">Second</a>
          <a href="http://example.com/page2">Third</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";

    const result = extract(html, sourceUrl);
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(result[0].url).toBe("http://example.com/page1");
    expect(result[0].text).toBe("First Second");
    expect(result[1].url).toBe("http://example.com/page2");
    expect(result[1].text).toBe("Third");
  });
});