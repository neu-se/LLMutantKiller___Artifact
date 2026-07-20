import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle links with javascript protocol and exactly 3 characters", () => {
    const html = `
      <html>
        <body>
          <a href="javascript:alert('x')">JS Link</a>
          <a href="abc">Three Char Link</a>
        </body>
      </html>
    `;
    const sourceUrl = "https://example.com";
    const result = extract(html, sourceUrl);
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("https://example.com/abc");
  });
});