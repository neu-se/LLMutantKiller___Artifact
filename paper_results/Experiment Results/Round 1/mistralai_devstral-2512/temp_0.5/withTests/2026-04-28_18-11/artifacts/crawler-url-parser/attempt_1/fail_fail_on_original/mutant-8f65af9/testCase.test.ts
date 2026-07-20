import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text assignment behavior", () => {
  it("should correctly assign link text to the extracted URL", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com">Test Link Text</a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";

    const result = extract(html, baseUrl);

    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("http://example.com/");
    expect(result[0].text).toBe("Test Link Text");
  });
});