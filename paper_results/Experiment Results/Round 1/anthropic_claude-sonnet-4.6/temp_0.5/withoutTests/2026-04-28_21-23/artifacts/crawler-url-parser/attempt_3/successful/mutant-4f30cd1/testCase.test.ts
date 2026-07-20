import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should exclude links with href shorter than 3 characters", () => {
    const html = `
      <html>
        <body>
          <a href="ab">Short href</a>
          <a href="http://example.com/page">Valid link</a>
        </body>
      </html>
    `;
    
    const result = extract(html, "http://example.com");
    const urls = result.map((r: { url: string }) => r.url);
    
    // In original: "ab" has length < 3? No, "ab" has length 2, which IS < 3, so it's skipped
    // In mutated: "ab" has length < 3 but doesn't match javascript/mailto/ftp, so AND is false, NOT skipped
    // "ab" relative to "http://example.com" resolves to "http://example.com/ab"
    expect(urls.some((url: string) => url.includes("/ab"))).toBe(false);
  });
});