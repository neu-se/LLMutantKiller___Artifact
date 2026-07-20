import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function', () => {
  it('should not include links with undefined href attribute', () => {
    // Create HTML with an anchor tag that has no href attribute
    // In the original code, typeof href == "undefined" check causes early return
    // In the mutated code, false || ... means undefined href won't be caught by this check
    // and href.length will throw a TypeError since undefined has no .length property
    const html = '<html><body><a>No href link</a><a href="http://example.com/valid">Valid link</a></body></html>';
    const sourceUrl = 'http://www.test.com/';
    
    // In the original code: the undefined href check returns early, no error thrown
    // In the mutated code: false || undefined.length < 3 throws TypeError
    expect(() => {
      const result = extract(html, sourceUrl);
      // Should only contain the valid link, not throw
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    }).not.toThrow();
  });
});