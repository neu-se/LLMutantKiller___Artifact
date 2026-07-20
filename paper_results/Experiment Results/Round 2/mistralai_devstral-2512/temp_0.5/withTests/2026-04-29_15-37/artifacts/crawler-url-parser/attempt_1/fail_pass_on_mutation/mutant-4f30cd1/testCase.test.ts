import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with href filtering", () => {
  it("should filter out javascript: URLs correctly", () => {
    const html = `
      <html>
        <body>
          <a href="javascript:void(0)">Click me</a>
          <a href="valid-link">Valid link</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    const validLinks = result.filter(link => link.url.includes("valid-link"));
    expect(validLinks.length).toBe(1);
    expect(result.length).toBe(1);
  });
});