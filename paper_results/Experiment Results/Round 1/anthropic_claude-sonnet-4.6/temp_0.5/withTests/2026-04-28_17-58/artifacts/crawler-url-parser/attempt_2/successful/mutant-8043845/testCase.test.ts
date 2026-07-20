import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function filters short hrefs", () => {
  it("should not include hrefs shorter than 3 characters in extracted URLs", () => {
    const html = `
      <html>
        <body>
          <a href="ab">short link</a>
          <a href="http://www.example.com/page">valid link</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://www.example.com/");
    // In original code, href "ab" (length < 3) is filtered out
    // In mutated code (if false) return, "ab" is processed and resolved against base URL
    // becoming "http://www.example.com/ab" which would be included
    const urls = result.map((r: { url: string }) => r.url);
    const hasShortHrefResolved = urls.some((u: string) => u.includes("/ab"));
    expect(hasShortHrefResolved).toBe(false);
  });
});