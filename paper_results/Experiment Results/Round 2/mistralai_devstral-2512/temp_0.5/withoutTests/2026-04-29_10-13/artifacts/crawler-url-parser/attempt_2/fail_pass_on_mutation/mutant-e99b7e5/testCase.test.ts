import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should preserve empty text for links without text content", () => {
    const html = `
      <html>
        <head></head>
        <body>
          <a href="http://example.com/link1"></a>
          <a href="http://example.com/link2">Some text</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://example.com");
    const emptyTextLink = result.find(link => link.url === "http://example.com/link1");

    expect(emptyTextLink).toBeDefined();
    expect(emptyTextLink?.text).not.toContain("Stryker was here!");
    expect(emptyTextLink?.text).toBe("");
  });
});