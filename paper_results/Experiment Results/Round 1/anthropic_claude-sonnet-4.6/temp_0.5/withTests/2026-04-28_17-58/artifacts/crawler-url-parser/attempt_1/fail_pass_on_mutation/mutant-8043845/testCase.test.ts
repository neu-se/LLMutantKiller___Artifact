import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function filters invalid hrefs", () => {
  it("should not include javascript: links in extracted URLs", () => {
    const html = `
      <html>
        <body>
          <a href="javascript:void(0)">click me</a>
          <a href="http://www.example.com/valid">valid link</a>
          <a href="mailto:test@example.com">email</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://www.example.com/");
    // In original code, javascript: and mailto: hrefs are filtered out
    // In mutated code (if false) return, these are NOT filtered and will be processed
    const urls = result.map((r: { url: string }) => r.url);
    // The valid link should be present
    expect(urls.some((u: string) => u.includes("valid"))).toBe(true);
    // javascript: links should NOT be present in results
    const hasJavascriptLink = urls.some((u: string) => u.startsWith("javascript:"));
    expect(hasJavascriptLink).toBe(false);
  });
});