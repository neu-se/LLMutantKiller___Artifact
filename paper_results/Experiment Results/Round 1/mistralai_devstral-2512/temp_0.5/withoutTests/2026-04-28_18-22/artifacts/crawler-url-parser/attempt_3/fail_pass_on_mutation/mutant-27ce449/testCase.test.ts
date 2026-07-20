import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should not include URLs that fail parsing", () => {
    const html = `
      <html>
        <head><base href="http://example.com"></head>
        <body>
          <a href="javascript:void(0)">Invalid Link</a>
          <a href="mailto:test@example.com">Email Link</a>
          <a href="ftp://files.example.com">FTP Link</a>
          <a href="http://valid.com">Valid Link</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://example.com");
    const filteredUrls = result.filter(item => item.url);
    expect(filteredUrls.length).toBe(1);
    expect(filteredUrls[0].url).toBe("http://valid.com/");
  });
});