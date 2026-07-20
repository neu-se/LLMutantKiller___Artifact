import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract handles fragment-only URLs', () => {
  it('should not include fragment-only anchor links as separate URLs when stripFragment is true', () => {
    const html = `<html><body>
      <a href="http://www.example.com/page#section-one">link with fragment</a>
      <a href="http://www.example.com/page">link without fragment</a>
    </body></html>`;
    
    const result = extract(html, "http://www.example.com/page");
    // With stripFragment: true, both URLs normalize to same URL and deduplicate
    // With stripFragment: false, they remain as separate URLs
    const urls = result.map((r: any) => r.url);
    const uniquePageUrls = urls.filter((u: string) => u.includes('example.com/page'));
    expect(uniquePageUrls.length).toBe(0);
  });
});