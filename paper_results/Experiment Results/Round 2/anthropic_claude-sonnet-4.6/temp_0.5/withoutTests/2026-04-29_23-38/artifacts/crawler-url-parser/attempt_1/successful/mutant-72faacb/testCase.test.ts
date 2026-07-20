import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function with undefined href', () => {
  it('should skip anchor tags with undefined href without throwing an error', () => {
    // In the original code, the check is: typeof href == "undefined"
    // In the mutated code, the check is: typeof href == ""
    // typeof undefined is "undefined", not "", so the mutated code will NOT skip undefined hrefs
    // This means it will try to call href.length on undefined, causing a TypeError
    
    const html = '<html><body><a>Link with no href</a><a href="http://example.com">Valid link</a></body></html>';
    const sourceUrl = 'http://source.com';
    
    // Original code: skips the anchor with undefined href, returns only the valid link
    // Mutated code: tries to access href.length on undefined, throws TypeError
    const result = extract(html, sourceUrl);
    
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0].url).toContain('example.com');
  });
});