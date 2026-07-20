import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function behavior with undefined currentUrl", () => {
  it("should not include undefined URLs in the result", () => {
    const html = `
      <html>
        <body>
          <a href="">Empty URL</a>
          <a href="http://valid.com">Valid URL</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://base.com");
    const emptyUrls = result.filter(url => !url.url || url.url === "");
    const validUrls = result.filter(url => url.url && url.url.includes("http://valid.com"));

    expect(emptyUrls.length).toBe(0);
    expect(validUrls.length).toBe(1);
  });
});