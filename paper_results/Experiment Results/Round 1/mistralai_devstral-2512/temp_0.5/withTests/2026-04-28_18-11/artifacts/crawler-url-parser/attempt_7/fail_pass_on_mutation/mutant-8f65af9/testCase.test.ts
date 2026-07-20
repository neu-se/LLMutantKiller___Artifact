import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text assignment behavior", () => {
  it("should correctly handle text assignment when link text is empty", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/test"></a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";

    const result = extract(html, baseUrl);

    expect(result).toHaveLength(1);
    expect(result[0].text).toBe("");
  });
});