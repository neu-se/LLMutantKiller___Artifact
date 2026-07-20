import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should filter out javascript, mailto, and ftp links", () => {
    const html = `
      <html>
        <body>
          <a href="javascript:void(0)">JS Link</a>
          <a href="mailto:test@example.com">Email Link</a>
          <a href="ftp://example.com">FTP Link</a>
          <a href="https://example.com/valid">Valid Link</a>
        </body>
      </html>
    `;
    const sourceUrl = "https://example.com";
    const result = extract(html, sourceUrl);

    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("https://example.com/valid");
    expect(result[0].text).toBe("Valid Link");
  });
});