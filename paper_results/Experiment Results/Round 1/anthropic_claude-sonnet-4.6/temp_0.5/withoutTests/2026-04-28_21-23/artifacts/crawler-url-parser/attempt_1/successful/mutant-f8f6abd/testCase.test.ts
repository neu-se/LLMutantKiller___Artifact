import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function', () => {
  it('should not include links with undefined href in the result', () => {
    // Create HTML with an anchor tag that has no href attribute
    // In the original code, typeof href == "undefined" check prevents processing
    // In the mutated code, false || ... means undefined href won't be caught by the first condition
    // but href.length will throw an error since href is undefined
    const html = '<html><body><a>Link without href</a><a href="http://example.com/page">Valid Link</a></body></html>';
    const sourceUrl = 'http://example.com';
    
    // In the original code: if (typeof href == "undefined" ...) return; 
    // - anchor with no href: href is undefined, typeof check catches it, returns early (no error)
    // In the mutated code: if (false || href.length < 3 ...)
    // - anchor with no href: href is undefined, accessing .length on undefined throws TypeError
    
    // The original should work fine and return only the valid link
    const result = extract(html, sourceUrl);
    
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    // Should contain the valid link
    expect(result.some(r => r.url && r.url.includes('example.com/page'))).toBe(true);
  });
});