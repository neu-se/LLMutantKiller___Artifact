import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with null text handling", () => {
  it("should handle null text in anchor elements correctly", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1">Valid Text</a>
          <a href="http://example.com/page2"></a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";
    const result = extract(html, baseUrl);

    // Find the entry with null/empty text
    const nullTextEntry = result.find(entry => entry.url === "http://example.com/page2");
    expect(nullTextEntry).toBeDefined();
    expect(nullTextEntry?.text).toBe("");
    expect(nullTextEntry?.text).not.toBe("Stryker was here!");
  });
});