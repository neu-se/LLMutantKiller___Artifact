import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should correctly handle text assignment in extracted URLs", () => {
    const html = `
      <html>
        <head><base href="http://example.com"></head>
        <body>
          <a href="http://example.com/page1">Link Text</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";
    const result = extract(html, sourceUrl);

    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("http://example.com/page1");
    expect(result[0].text).toBe("Link Text");
  });
});