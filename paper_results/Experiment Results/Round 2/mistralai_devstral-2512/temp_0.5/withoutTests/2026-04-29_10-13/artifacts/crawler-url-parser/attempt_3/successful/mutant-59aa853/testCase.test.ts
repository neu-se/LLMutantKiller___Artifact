import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function - text concatenation with different texts", () => {
  it("should concatenate different texts for the same URL", () => {
    const html = `
      <html>
        <head><base href="http://example.com/"></head>
        <body>
          <a href="/target">First</a>
          <a href="/target">Second</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://example.com/");
    const targetLink = result.find(link => link.url === "http://example.com/target");

    expect(targetLink).toBeDefined();
    expect(targetLink?.text).toBe("First Second");
  });
});