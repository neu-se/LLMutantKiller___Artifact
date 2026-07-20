import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
  it('should not filter out hrefs with length >= 3 that are not javascript, mailto, or ftp', () => {
    const html = `
      <html>
        <head><base href="http://example.com"></head>
        <body>
          <a href="ab">Short link</a>
          <a href="abc">Valid link</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";
    const result = extract(html, sourceUrl);
    const validLink = result.find(link => link.url === "http://example.com/abc");
    expect(validLink).toBeDefined();
    expect(validLink.text).toBe("Valid link");
  });
});