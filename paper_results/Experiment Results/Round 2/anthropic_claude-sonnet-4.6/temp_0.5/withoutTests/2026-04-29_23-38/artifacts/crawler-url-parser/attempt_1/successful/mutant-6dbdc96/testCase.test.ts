import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function', () => {
  it('should skip links with href shorter than 3 characters', () => {
    // The mutation changes `href.length < 3` to `false`, meaning short hrefs will no longer be filtered
    // In the original code, hrefs with length < 3 (like "ab", "/a", etc.) are skipped
    // In the mutated code, these short hrefs are processed instead of being skipped
    const html = `
      <html>
        <body>
          <a href="ab">Short link</a>
          <a href="http://example.com/valid">Valid link</a>
        </body>
      </html>
    `;
    
    const result = extract(html, 'http://example.com/');
    
    // In the original code, "ab" has length 2 which is < 3, so it should be skipped
    // Only the valid link should be in the results
    const urls = result.map((r: any) => r.url);
    
    // The valid link should be present
    expect(urls.some((url: string) => url.includes('example.com/valid'))).toBe(true);
    
    // A link with href "ab" should NOT be present in original code
    // In mutated code, "ab" would be processed as a relative URL and might appear
    // We check that no URL ending in just "ab" (relative to base) appears
    const hasShortHrefUrl = urls.some((url: string) => url === 'http://example.com/ab');
    expect(hasShortHrefUrl).toBe(false);
  });
});