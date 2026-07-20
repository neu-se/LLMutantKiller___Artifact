import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text assignment behavior", () => {
  it("should correctly handle null text in link extraction", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/test">Link Text</a>
          <a href="http://example.com/test2"></a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";

    const result = extract(html, baseUrl);

    expect(result).toHaveLength(2);
    expect(result[0].text).toBe("Link Text");
    expect(result[1].text).toBe("");
  });
});