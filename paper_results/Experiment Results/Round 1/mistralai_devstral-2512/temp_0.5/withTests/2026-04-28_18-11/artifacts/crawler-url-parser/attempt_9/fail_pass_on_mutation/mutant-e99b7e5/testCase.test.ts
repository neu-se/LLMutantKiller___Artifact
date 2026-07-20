import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text handling", () => {
  it("should correctly handle empty anchor text", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1"></a>
          <a href="http://example.com/page2">Text</a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";
    const result = extract(html, baseUrl);

    const emptyTextEntry = result.find(e => e.url === "http://example.com/page1");
    expect(emptyTextEntry).toBeDefined();
    expect(emptyTextEntry?.text).toBe("");

    const textEntry = result.find(e => e.url === "http://example.com/page2");
    expect(textEntry).toBeDefined();
    expect(textEntry?.text).toBe("Text");
  });
});