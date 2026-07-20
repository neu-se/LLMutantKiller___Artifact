import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle links with javascript protocol and short valid links correctly", () => {
    const html = `
      <html>
        <body>
          <a href="javascript:alert('test')">JS Link</a>
          <a href="mailto:test@example.com">Mail Link</a>
          <a href="ftp://example.com">FTP Link</a>
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