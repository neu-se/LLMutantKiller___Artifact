import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should process anchor with undefined href attribute", () => {
    const html = `
      <html>
        <head><base href="http://example.com"></head>
        <body>
          <a>Link without href</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";
    const result = extract(html, sourceUrl);
    expect(result).toHaveLength(0);
  });
});