import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with base URL', () => {
  it('should correctly resolve a relative URL against a base URL with slashesDenoteHost behavior', () => {
    // Using a protocol-relative base URL that gets converted to http://
    // The mutation changes slashesDenoteHost from true to false in URL.parse for baseUrlStr
    // This affects how //host/path style URLs are parsed
    const baseUrl = '//example.com/path/page';
    const relativeUrl = 'other';
    
    const result = parse(relativeUrl, baseUrl);
    
    // With original code (slashesDenoteHost=true), //example.com/path/page becomes http://example.com/path/page
    // and resolving 'other' against it gives http://example.com/path/other
    // With mutated code (slashesDenoteHost=false), the host detection may differ
    expect(result).not.toBeNull();
    expect(result?.host).toBe('example.com');
    expect(result?.url).toContain('example.com');
  });
});