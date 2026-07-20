import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function behavior with null currentUrl.url", () => {
  it("should not include entries when currentUrl.url is null", () => {
    const html = `
      <html>
        <body>
          <a href="javascript:void(0)">Invalid URL</a>
          <a href="http://valid.com">Valid URL</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://base.com");
    const javascriptUrls = result.filter(url => url.url && url.url.includes("javascript:"));
    const validUrls = result.filter(url => url.url && url.url.includes("http://valid.com"));

    expect(javascriptUrls.length).toBe(0);
    expect(validUrls.length).toBe(1);
  });
});