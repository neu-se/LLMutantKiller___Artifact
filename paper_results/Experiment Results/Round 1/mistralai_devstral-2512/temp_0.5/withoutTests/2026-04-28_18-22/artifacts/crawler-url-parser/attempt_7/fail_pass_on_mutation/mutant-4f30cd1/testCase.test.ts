import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should skip javascript links but include valid short links", () => {
    const html = `
      <html>
        <body>
          <a href="javascript:void(0)">JS Link</a>
          <a href="abc">Short Link</a>
          <a href="https://example.com/valid">Valid Link</a>
        </body>
      </html>
    `;
    const sourceUrl = "https://example.com";
    const result = extract(html, sourceUrl);
    expect(result).toHaveLength(2);
    expect(result.some(r => r.url === "https://example.com/abc")).toBe(true);
    expect(result.some(r => r.url === "https://example.com/valid")).toBe(true);
  });
});