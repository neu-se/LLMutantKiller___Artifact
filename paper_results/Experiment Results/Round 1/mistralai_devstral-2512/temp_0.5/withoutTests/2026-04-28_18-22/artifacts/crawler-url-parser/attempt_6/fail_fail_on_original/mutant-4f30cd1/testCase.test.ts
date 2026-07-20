import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should correctly handle links with javascript protocol and short length", () => {
    const html = `
      <html>
        <body>
          <a href="javascript:void(0)">JS Link</a>
          <a href="ab">Short Link</a>
        </body>
      </html>
    `;
    const sourceUrl = "https://example.com";
    const result = extract(html, sourceUrl);
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("https://example.com/ab");
  });
});