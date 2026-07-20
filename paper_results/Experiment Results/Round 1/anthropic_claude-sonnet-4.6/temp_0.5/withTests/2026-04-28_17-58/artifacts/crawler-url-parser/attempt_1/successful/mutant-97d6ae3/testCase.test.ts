import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function with invalid URL that causes parse to return null', () => {
  it('should not throw when an anchor href contains illegal characters causing parse to return null', () => {
    // This HTML contains a link with illegal characters (non-ASCII) in the href
    // parse() will return null for such URLs
    // Original code: if (currentUrl && currentUrl.url) - safely skips null
    // Mutated code: if (currentUrl || currentUrl.url) - throws TypeError on null.url
    const html = '<html><body>' +
      '<a href="http://www.example.com/valid">valid link</a>' +
      '<a href="http://www.example.com/ünvalid-ürl">invalid chars link</a>' +
      '</body></html>';
    
    expect(() => {
      const result = extract(html, 'http://www.example.com/');
      expect(Array.isArray(result)).toBe(true);
    }).not.toThrow();
  });
});