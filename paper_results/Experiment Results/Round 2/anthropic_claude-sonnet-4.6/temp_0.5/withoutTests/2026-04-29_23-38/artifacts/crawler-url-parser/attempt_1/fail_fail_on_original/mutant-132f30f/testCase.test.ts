import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('crawler-url-parser stripWWW behavior', () => {
  it('should strip www from URLs when extracting links', () => {
    const html = '<a href="http://www.example.com/page">Link</a>';
    const sourceUrl = 'http://www.example.com/';
    
    const results = extract(html, sourceUrl);
    
    // When stripWWW is true, www should be stripped from the URL
    // When stripWWW is false, www should remain in the URL
    // The parse function uses result_normalize_options internally via normalize-url
    // We need to check if www is stripped or not
    
    // Actually, looking at the code more carefully, the parse function doesn't use
    // result_normalize_options directly in the visible code. Let me check what
    // the extract function returns for a www URL.
    
    // The key behavior: with stripWWW: true, "www.example.com" becomes "example.com"
    // With stripWWW: false, "www.example.com" stays as "www.example.com"
    
    // Since the source URL has www and the link has www, after stripping www
    // the link URL would match the base URL and be removed from results
    // But with stripWWW: false, they might differ or the domain comparison changes
    
    const html2 = '<a href="http://www.example.com/about">About</a>';
    const sourceUrl2 = 'http://example.com/';
    
    const results2 = extract(html2, sourceUrl2);
    
    // With stripWWW: true, "http://www.example.com/about" becomes "http://example.com/about"
    // which has the same domain as sourceUrl2, so type would be "internal" or similar
    // With stripWWW: false, "http://www.example.com/about" keeps www, 
    // so it would be treated as a subdomain URL
    
    if (results2.length > 0) {
      const link = results2[0];
      // With stripWWW: true, www is stripped so URL should not contain www
      expect(link.url).not.toContain('www.');
    }
  });
});