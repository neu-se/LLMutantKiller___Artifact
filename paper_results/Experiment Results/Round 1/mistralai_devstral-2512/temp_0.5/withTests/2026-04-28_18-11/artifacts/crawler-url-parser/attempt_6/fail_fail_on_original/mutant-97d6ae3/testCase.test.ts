import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with null currentUrl handling", () => {
  it("should correctly handle null currentUrl in the placeholder condition", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com">Example</a>
          <a href="http://example.com">Another Example</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";

    const result = extract(html, sourceUrl);
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0].text).toBe("Example Another Example");
  });
});