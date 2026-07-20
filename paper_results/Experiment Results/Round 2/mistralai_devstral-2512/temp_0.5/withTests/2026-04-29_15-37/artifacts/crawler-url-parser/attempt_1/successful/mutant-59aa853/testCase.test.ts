import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text concatenation behavior", () => {
  it("should concatenate text for duplicate URLs when text is not already included", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1">First Link</a>
          <a href="http://example.com/page1">Second Link</a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";
    const result = extract(html, baseUrl);

    // Find the entry for the duplicate URL
    const page1Entry = result.find(entry => entry.url === "http://example.com/page1");

    // In the original code, the text should be concatenated: "First Link Second Link"
    // In the mutated code (if false), the text won't be concatenated and will remain "First Link"
    expect(page1Entry?.text).toBe("First Link Second Link");
  });
});