import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function - text concatenation behavior", () => {
  it("should concatenate text from multiple links with the same URL when they have different text", () => {
    const html = `
      <html>
        <head><base href="http://example.com/base/"></head>
        <body>
          <a href="http://example.com/target">First Text</a>
          <a href="http://example.com/target">Second Text</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://example.com/base/");
    const targetLink = result.find(link => link.url === "http://example.com/target/");

    expect(targetLink).toBeDefined();
    expect(targetLink?.text).toBe("First Text Second Text");
  });
});