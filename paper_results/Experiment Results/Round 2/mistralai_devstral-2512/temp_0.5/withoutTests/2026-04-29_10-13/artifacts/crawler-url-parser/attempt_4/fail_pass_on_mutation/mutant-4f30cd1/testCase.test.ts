import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should filter out javascript links but keep valid short links", () => {
    const html = `
      <html>
        <body>
          <a href="javascript:void(0)">JS Link</a>
          <a href="abc">Short Link</a>
        </body>
      </html>
    `;
    const sourceUrl = "https://example.com";
    const result = extract(html, sourceUrl);
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("https://example.com/abc");
  });
});