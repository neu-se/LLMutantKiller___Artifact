import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe("extract function", () => {
  it("should not include links with href shorter than 3 characters", () => {
    // The original code has: if (typeof href == "undefined" || href.length < 3 || ...)
    // The mutated code has: if (false || ...) which removes the undefined and length checks
    // A link with href of length < 3 (e.g., "ab") should be excluded in original but included in mutated code
    
    const html = `
      <html>
        <body>
          <a href="ab">Short link</a>
          <a href="http://example.com/valid">Valid link</a>
        </body>
      </html>
    `;
    
    const result = extract(html, "http://example.com/");
    
    // In the original code, "ab" has length 2 which is < 3, so it should be filtered out
    // In the mutated code, the length check is removed, so "ab" might be processed
    // The valid link should always be present
    const urls = result.map((r: any) => r.url);
    
    // The short href "ab" should not produce a valid URL in the results
    // when processed against base URL "http://example.com/", "ab" would resolve to "http://example.com/ab"
    // In original: filtered by href.length < 3, so not included
    // In mutated: not filtered by length, so it would be processed and potentially included
    const hasShortHrefUrl = urls.some((url: string) => url && url.includes('/ab'));
    
    expect(hasShortHrefUrl).toBe(false);
  });
});