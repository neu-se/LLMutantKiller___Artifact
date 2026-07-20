import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function behavior with invalid URL parsing", () => {
  it("should skip URLs that cannot be parsed", () => {
    const html = `
      <html>
        <body>
          <a href="ftp://invalid.com">Invalid Protocol</a>
          <a href="http://valid.com">Valid URL</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://base.com");
    const invalidUrls = result.filter(url => url.url && url.url.includes("ftp://invalid.com"));
    const validUrls = result.filter(url => url.url && url.url.includes("http://valid.com"));

    expect(invalidUrls.length).toBe(0);
    expect(validUrls.length).toBe(1);
  });
});