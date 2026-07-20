import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should skip links with javascript protocol but include short valid links", () => {
    const html = `
      <html>
        <body>
          <a href="javascript:void(0)">Click me</a>
          <a href="ab">Short link</a>
        </body>
      </html>
    `;
    const sourceUrl = "https://example.com";
    const result = extract(html, sourceUrl);
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("https://example.com/ab");
  });
});