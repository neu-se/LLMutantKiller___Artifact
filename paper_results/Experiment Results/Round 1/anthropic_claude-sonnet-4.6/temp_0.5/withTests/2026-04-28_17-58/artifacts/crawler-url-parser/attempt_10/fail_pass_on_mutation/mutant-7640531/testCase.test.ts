import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract URLs from HTML with fragment links', () => {
  it('should correctly handle anchor tags with fragment-only hrefs being filtered', () => {
    const html = `<html><body>
      <a href="http://example.com/page#section">link1</a>
      <a href="http://example.com/other">link2</a>
    </body></html>`;
    
    const result = extract(html, "http://example.com/");
    
    // fragment should be stripped, so page#section becomes page
    // both page and other should appear, but page#section and page 
    // should be deduplicated to just one entry for page
    const urls = result.map((r: any) => r.url);
    expect(urls).toContain("http://example.com/page");
    expect(urls).not.toContain("http://example.com/page#section");
  });
});