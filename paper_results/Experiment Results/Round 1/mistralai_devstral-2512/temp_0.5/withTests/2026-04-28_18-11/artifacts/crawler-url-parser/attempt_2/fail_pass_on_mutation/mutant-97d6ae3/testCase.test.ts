import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with invalid URL", () => {
  it("should handle invalid URL in href attribute", () => {
    const html = `
      <html>
        <body>
          <a href="javascript:void(0)">Invalid Link</a>
          <a href="mailto:test@example.com">Email Link</a>
          <a href="ftp://example.com">FTP Link</a>
          <a href="http://valid.com">Valid Link</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";

    const result = extract(html, sourceUrl);
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1); // Only the valid link should be extracted
    expect(result[0].url).toBe("http://valid.com/");
  });
});