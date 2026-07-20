import { extract } from "./crawler-url-parser.js";

describe("extract function", () => {
  it("should include links with matching text in the result", () => {
    const html = `
      <html>
        <body>
          <a href="https://example.com/page1">Example Page</a>
          <a href="https://example.com/page2">Another Page</a>
        </body>
      </html>
    `;
    const sourceUrl = "https://example.com";
    const result = extract(html, sourceUrl);

    const page1Link = result.find((link) => link.url === "https://example.com/page1");
    const page2Link = result.find((link) => link.url === "https://example.com/page2");

    expect(page1Link).toBeDefined();
    expect(page1Link.text).toBe("Example Page");
    expect(page2Link).toBeDefined();
    expect(page2Link.text).toBe("Another Page");
  });
});