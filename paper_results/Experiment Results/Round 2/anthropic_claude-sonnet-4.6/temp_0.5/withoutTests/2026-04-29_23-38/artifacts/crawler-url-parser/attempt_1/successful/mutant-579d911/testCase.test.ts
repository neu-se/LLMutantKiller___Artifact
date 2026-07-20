import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function', () => {
  it('should filter out href values with length less than 3', () => {
    // A single character href like "/" has length 1 (< 3)
    // Original code filters it out, mutated code does not
    const html = '<html><body><a href="/">Home</a><a href="ab">Short</a><a href="http://example.com/page">Valid</a></body></html>';
    const sourceUrl = 'http://example.com/';
    
    const result = extract(html, sourceUrl);
    
    // In original code, "/" (length 1) and "ab" (length 2) are filtered out
    // Only "http://example.com/page" should remain
    // In mutated code, "/" and "ab" would NOT be filtered by length check
    const urls = result.map((r: any) => r.url);
    
    // The "/" href resolves to "http://example.com/" which is the base URL
    // and gets deleted by urlMap.delete(baseUrlStr)
    // "ab" resolves to "http://example.com/ab" - this would appear in mutated but not original
    const hasAbUrl = urls.some((url: string) => url && url.includes('/ab'));
    
    expect(hasAbUrl).toBe(false);
  });
});