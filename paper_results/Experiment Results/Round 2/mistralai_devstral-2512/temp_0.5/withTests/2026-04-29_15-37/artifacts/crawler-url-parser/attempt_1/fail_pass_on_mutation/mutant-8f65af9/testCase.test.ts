import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text handling", () => {
  it("should correctly handle link text when extracting URLs", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1">Test Link Text</a>
          <a href="http://example.com/page2"></a>
        </body>
      </html>
    `;

    const result = extract(html, "http://example.com");
    const linkWithText = result.find((link) => link.url === "http://example.com/page1");
    const linkWithoutText = result.find((link) => link.url === "http://example.com/page2");

    expect(linkWithText).toBeDefined();
    expect(linkWithText?.text).toBe("Test Link Text");
    expect(linkWithoutText).toBeDefined();
    expect(linkWithoutText?.text).toBe("");
  });
});