import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text assignment behavior", () => {
  it("should correctly assign link text when href is relative path", () => {
    const html = `
      <html>
        <body>
          <a href="/test-page">Link Text</a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com/base";

    const result = extract(html, baseUrl);

    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("http://example.com/test-page");
    expect(result[0].text).toBe("Link Text");
  });
});