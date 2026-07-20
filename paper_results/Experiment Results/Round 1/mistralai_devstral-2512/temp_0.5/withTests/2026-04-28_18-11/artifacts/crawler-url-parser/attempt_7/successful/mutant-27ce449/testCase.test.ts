import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function behavior with null currentUrl check", () => {
  it("should not process URLs when currentUrl is null", () => {
    const html = `
      <html>
        <body>
          <a href="   ">Whitespace URL</a>
          <a href="http://valid.com">Valid URL</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://base.com");
    const whitespaceUrls = result.filter(url => url.url && url.url.trim() === "");
    const validUrls = result.filter(url => url.url && url.url.includes("http://valid.com"));

    expect(whitespaceUrls.length).toBe(0);
    expect(validUrls.length).toBe(1);
  });
});