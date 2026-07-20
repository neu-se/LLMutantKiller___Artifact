import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract should filter short hrefs', () => {
  it('should not include links with href shorter than 3 characters', () => {
    const html = `<html><body>
      <a href="ab">short link</a>
      <a href="http://www.example.com/page">valid link</a>
    </body></html>`;
    
    const result = extract(html, "http://www.example.com/page");
    
    // The short href "ab" should be filtered out
    // Only the valid link should remain (but it equals the source URL, so it gets deleted too)
    // Let's check that no URL derived from "ab" appears
    const urls = result.map((el: any) => el.url);
    const hasShortHref = urls.some((url: string) => url.includes('/ab'));
    expect(hasShortHref).toBe(false);
    // With mutation, "ab" is not filtered and gets parsed relative to base URL
    // resulting in http://www.example.com/ab being included
    expect(result.length).toBe(0);
  });
});