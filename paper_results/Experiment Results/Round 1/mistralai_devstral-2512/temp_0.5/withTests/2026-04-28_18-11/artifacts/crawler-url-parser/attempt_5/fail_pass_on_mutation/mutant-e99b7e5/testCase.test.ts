import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text handling", () => {
  it("should correctly handle empty text in anchor elements", () => {
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

    const emptyTextEntry = result.find(entry => entry.url === "http://example.com/page1");
    const textEntry = result.find(entry => entry.url === "http://example.com/page2");

    expect(emptyTextEntry).toBeDefined();
    expect(emptyTextEntry?.text).toBe("");
    expect(textEntry).toBeDefined();
    expect(textEntry?.text).toBe("Some text");
  });
});