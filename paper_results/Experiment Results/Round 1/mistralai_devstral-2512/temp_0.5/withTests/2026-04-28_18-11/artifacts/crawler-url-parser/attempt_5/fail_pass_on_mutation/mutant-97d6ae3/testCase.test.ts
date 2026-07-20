import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with valid links", () => {
  it("should correctly extract valid links and handle text concatenation", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1">First Link</a>
          <a href="http://example.com/page1">Second Link</a>
          <a href="http://example.com/page2">Third Link</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";

    const result = extract(html, sourceUrl);
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(result[0].url).toBe("http://example.com/page1");
    expect(result[0].text).toBe("First Link Second Link");
    expect(result[1].url).toBe("http://example.com/page2");
    expect(result[1].text).toBe("Third Link");
  });
});