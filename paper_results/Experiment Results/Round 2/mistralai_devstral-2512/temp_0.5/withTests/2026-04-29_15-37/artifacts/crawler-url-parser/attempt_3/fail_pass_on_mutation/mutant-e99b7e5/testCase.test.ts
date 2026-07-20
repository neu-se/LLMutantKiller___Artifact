import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text handling", () => {
  it("should handle null text content correctly", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1"></a>
          <a href="http://example.com/page2">Some text</a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";
    const result = extract(html, baseUrl);

    // Find the link with null text
    const nullTextLink = result.find(link => link.url === "http://example.com/page1");

    // The text should be an empty string, not "Stryker was here!"
    expect(nullTextLink?.text).toBe("");
    expect(nullTextLink?.text).not.toBe("Stryker was here!");
  });
});