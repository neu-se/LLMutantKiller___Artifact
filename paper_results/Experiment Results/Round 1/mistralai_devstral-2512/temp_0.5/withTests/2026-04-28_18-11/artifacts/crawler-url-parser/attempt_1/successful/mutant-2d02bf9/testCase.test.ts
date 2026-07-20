import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text concatenation test", () => {
  it("should concatenate text for duplicate URLs", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1">First Link</a>
          <a href="http://example.com/page1">Second Link</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    const page1Entry = result.find(entry => entry.url === "http://example.com/page1");
    expect(page1Entry).toBeDefined();
    expect(page1Entry?.text).toBe("First Link Second Link");
  });
});