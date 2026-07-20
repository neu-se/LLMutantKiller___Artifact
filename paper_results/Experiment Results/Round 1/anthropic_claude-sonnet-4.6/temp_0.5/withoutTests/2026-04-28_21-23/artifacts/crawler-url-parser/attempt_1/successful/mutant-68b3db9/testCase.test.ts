import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should trim whitespace from link text", () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1">  Hello World  </a>
        </body>
      </html>
    `;
    
    const results = extract(html, "http://example.com/");
    
    expect(results.length).toBeGreaterThan(0);
    const link = results.find((r: any) => r.url.includes("page1"));
    expect(link).toBeDefined();
    expect(link.text).toBe("Hello World");
  });
});