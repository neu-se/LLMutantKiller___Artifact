import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle links with length exactly 2 characters", () => {
    const html = `
      <html>
        <body>
          <a href="ab">Two char link</a>
          <a href="https://example.com">Normal link</a>
        </body>
      </html>
    `;
    const sourceUrl = "https://example.com";
    const result = extract(html, sourceUrl);
    expect(result).toHaveLength(2);
    expect(result.some(r => r.url === "https://example.com/ab")).toBe(true);
    expect(result.some(r => r.url === "https://example.com/")).toBe(true);
  });
});