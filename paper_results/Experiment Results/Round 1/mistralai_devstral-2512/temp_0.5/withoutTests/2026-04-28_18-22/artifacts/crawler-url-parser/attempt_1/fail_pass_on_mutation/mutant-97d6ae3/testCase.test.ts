import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle null currentUrl correctly", () => {
    const html = `
      <html>
        <body>
          <a href="javascript:void(0)">Invalid Link</a>
          <a href="mailto:test@example.com">Email Link</a>
          <a href="ftp://example.com">FTP Link</a>
          <a href="valid-link">Valid Link</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com/page";
    const result = extract(html, sourceUrl);
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("http://example.com/valid-link");
    expect(result[0].text).toBe("Valid Link");
  });
});