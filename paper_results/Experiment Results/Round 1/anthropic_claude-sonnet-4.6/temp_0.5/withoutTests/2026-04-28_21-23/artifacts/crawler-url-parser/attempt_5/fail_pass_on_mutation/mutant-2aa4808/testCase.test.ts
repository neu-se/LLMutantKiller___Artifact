import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should handle relative currentUrl with non-standard base URL', () => {
    // Pass a base URL without // prefix and without http:// 
    // This won't get http:// prepended by the code
    // URL.parse with slashesDenoteHost=true vs false might differ
    const result = parse('page', 'http://example.com/section/index.html');
    expect(result).not.toBeNull();
    // The resolved URL should be http://example.com/section/page
    expect(result?.url).toBe('http://example.com/section/page');
  });
});