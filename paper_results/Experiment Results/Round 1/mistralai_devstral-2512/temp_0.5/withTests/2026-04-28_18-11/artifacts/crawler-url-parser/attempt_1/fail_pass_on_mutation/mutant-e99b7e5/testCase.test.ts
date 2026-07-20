import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with null text handling", () => {
  it("should handle null text in anchor elements correctly", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1">Valid Text</a>
          <a href="http://example.com/page2"></a>
          <a href="http://example.com/page3">Another Text</a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";
    const result = extract(html, baseUrl);

    // Find the entry with null/empty text
    const nullTextEntry = result.find(entry => entry.url === "http://example.com/page2");
    expect(nullTextEntry).toBeDefined();
    expect(nullTextEntry?.text).toBe("");

    // Verify other entries are not affected
    const validTextEntry = result.find(entry => entry.url === "http://example.com/page1");
    expect(validTextEntry).toBeDefined();
    expect(validTextEntry?.text).toBe("Valid Text");

    const anotherTextEntry = result.find(entry => entry.url === "http://example.com/page3");
    expect(anotherTextEntry).toBeDefined();
    expect(anotherTextEntry?.text).toBe("Another Text");
  });
});