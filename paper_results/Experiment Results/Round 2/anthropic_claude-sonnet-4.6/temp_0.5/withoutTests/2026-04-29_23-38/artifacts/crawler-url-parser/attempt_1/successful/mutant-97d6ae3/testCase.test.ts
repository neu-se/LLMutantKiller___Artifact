import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function', () => {
  it('should handle links that parse to null without throwing an error', () => {
    // A URL with tel: protocol passes the href filter but causes parse() to return null
    // Original: if (currentUrl && currentUrl.url) - safely skips null
    // Mutated: if (currentUrl || currentUrl.url) - throws TypeError on null.url
    const html = '<html><body><a href="tel:+1234567890">Call us</a></body></html>';
    const sourceUrl = 'http://example.com/';
    
    expect(() => {
      const result = extract(html, sourceUrl);
      expect(Array.isArray(result)).toBe(true);
    }).not.toThrow();
  });
});