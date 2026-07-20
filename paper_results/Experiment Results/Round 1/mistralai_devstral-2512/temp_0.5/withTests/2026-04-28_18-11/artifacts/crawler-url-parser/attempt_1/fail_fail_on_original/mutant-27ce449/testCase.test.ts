import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function behavior with invalid URLs", () => {
  it("should not include URLs that fail parsing in the result", () => {
    const html = `
      <html>
        <body>
          <a href="invalid-url">Invalid URL</a>
          <a href="http://valid.com">Valid URL</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://base.com");
    const validUrls = result.filter(url => url.url.includes("valid.com"));
    const invalidUrls = result.filter(url => url.url.includes("invalid-url"));

    expect(validUrls.length).toBe(1);
    expect(invalidUrls.length).toBe(0);
  });
});