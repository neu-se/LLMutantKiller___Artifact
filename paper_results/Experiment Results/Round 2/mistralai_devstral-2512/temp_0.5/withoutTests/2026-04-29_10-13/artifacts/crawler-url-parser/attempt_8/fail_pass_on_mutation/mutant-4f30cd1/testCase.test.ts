import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle links with exactly 3 characters that match protocol patterns", () => {
    const html = `
      <html>
        <body>
          <a href="abc">Valid short link</a>
          <a href="ftp">FTP-like short link</a>
        </body>
      </html>
    `;
    const sourceUrl = "https://example.com";
    const result = extract(html, sourceUrl);
    expect(result).toHaveLength(2);
    expect(result.some(r => r.url === "https://example.com/abc")).toBe(true);
    expect(result.some(r => r.url === "https://example.com/ftp")).toBe(true);
  });
});