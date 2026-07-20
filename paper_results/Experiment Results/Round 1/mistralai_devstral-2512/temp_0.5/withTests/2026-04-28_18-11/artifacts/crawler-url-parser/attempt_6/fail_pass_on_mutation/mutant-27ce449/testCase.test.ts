import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function behavior with null currentUrl", () => {
  it("should skip URLs when currentUrl is null", () => {
    const html = `
      <html>
        <body>
          <a href="mailto:test@example.com">Mailto URL</a>
          <a href="http://valid.com">Valid URL</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://base.com");
    const mailtoUrls = result.filter(url => url.url && url.url.includes("mailto:"));
    const validUrls = result.filter(url => url.url && url.url.includes("http://valid.com"));

    expect(mailtoUrls.length).toBe(0);
    expect(validUrls.length).toBe(1);
  });
});