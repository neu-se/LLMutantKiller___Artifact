import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser extract with fragment URLs", () => {
  it("should handle anchor links with fragments in extract function", () => {
    // Test that extract processes URLs with fragments correctly
    // The stripFragment option in result_normalize_options affects normalization behavior
    const html = `<html><body>
      <a href="http://www.example.com/page#section">Link with fragment</a>
      <a href="http://www.example.com/page">Link without fragment</a>
    </body></html>`;
    
    const result = extract(html, "http://www.example.com/");
    
    // Both URLs should normalize to the same URL (fragment stripped)
    // so there should only be 1 unique URL (not 2)
    const urls = result.map((r: any) => r.url);
    
    // With stripFragment: true, both links point to same URL
    // With stripFragment: false, they would be different
    expect(urls.length).toBe(1);
    expect(urls[0]).toBe("http://www.example.com/page");
  });
});