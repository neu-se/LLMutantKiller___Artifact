import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should filter out javascript: href links and not include them in results", () => {
    const html = `
      <html>
        <body>
          <a href="javascript:void(0)">Click me</a>
          <a href="http://example.com/valid-link">Valid Link</a>
        </body>
      </html>
    `;
    
    const results = extract(html, "http://example.com/");
    
    // The javascript: link should be filtered out
    const jsLinks = results.filter((r: any) => r.url && r.url.includes("javascript"));
    expect(jsLinks.length).toBe(0);
    
    // The valid link should still be present
    const validLinks = results.filter((r: any) => r.url && r.url.includes("valid-link"));
    expect(validLinks.length).toBe(1);
  });
});