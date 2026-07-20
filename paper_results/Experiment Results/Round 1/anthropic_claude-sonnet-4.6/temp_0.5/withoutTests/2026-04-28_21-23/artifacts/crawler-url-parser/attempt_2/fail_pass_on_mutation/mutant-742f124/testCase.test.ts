import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser stripFragment option", () => {
  it("should deduplicate URLs that differ only by fragment when extracting links from HTML", () => {
    // If stripFragment is true, URLs with different fragments pointing to same page
    // should be treated as the same URL (deduplicated)
    // If stripFragment is false, they would be treated as different URLs
    const html = `
      <html><body>
        <a href="http://example.com/page#section1">Link 1</a>
        <a href="http://example.com/page#section2">Link 2</a>
        <a href="http://example.com/page">Link 3</a>
      </body></html>
    `;
    
    const results = extract(html, "http://other.com/");
    
    // With stripFragment: true, all three links point to same URL after normalization
    // so they should be deduplicated into one result
    // With stripFragment: false, fragment URLs might remain distinct
    const urls = results.map((r: any) => r.url);
    
    // All should resolve to the same base URL without fragment
    const uniqueBaseUrls = new Set(urls.map((u: string) => u.split('#')[0]));
    expect(uniqueBaseUrls.size).toBe(1);
    expect(results.length).toBe(1);
  });
});