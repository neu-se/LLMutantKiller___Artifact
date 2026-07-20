import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should exclude javascript: links from extracted URLs", () => {
    const html = `
      <html>
        <body>
          <a href="javascript:void(0)">Click me</a>
          <a href="http://example.com/page">Valid link</a>
        </body>
      </html>
    `;
    
    const result = extract(html, "http://example.com");
    
    // The javascript: link should be excluded
    const urls = result.map((r: { url: string }) => r.url);
    expect(urls.every((url: string) => !url.startsWith("javascript:"))).toBe(true);
    // The valid link should be present
    expect(urls.some((url: string) => url.includes("example.com/page"))).toBe(true);
  });
});