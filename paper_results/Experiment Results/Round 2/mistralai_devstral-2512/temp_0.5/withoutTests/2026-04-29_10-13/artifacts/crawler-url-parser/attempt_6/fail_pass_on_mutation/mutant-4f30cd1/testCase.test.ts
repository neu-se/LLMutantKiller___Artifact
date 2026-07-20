import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle links with exactly 3 characters including protocol prefix", () => {
    const html = `
      <html>
        <body>
          <a href="abc">Three char link</a>
          <a href="mailto:x">Mailto with 1 char</a>
        </body>
      </html>
    `;
    const sourceUrl = "https://example.com";
    const result = extract(html, sourceUrl);
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("https://example.com/abc");
  });
});