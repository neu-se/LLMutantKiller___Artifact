import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should correctly handle baseUrl with fragment followed by newline and additional content', () => {
    // Original /#.*$/: NO match on "http://example.com/page#frag\nmore" 
    // ($ requires end of string, but \nmore follows)
    // baseUrl stays as "http://example.com/page#frag\nmore"
    // URL.parse handles this: host=example.com, hash=#frag\nmore, after delete hash -> http://example.com/page
    // Resolving "/other" -> "http://example.com/other" ✓
    
    // Mutant /#.*/: matches "#frag", baseUrl becomes "http://example.com/page\nmore"
    // URL.parse("http://example.com/page\nmore") - \n corrupts the URL
    // This likely results in null or wrong host
    
    const result = parse('/other', 'http://example.com/page#frag\nmore');
    expect(result).not.toBeNull();
    expect(result!.host).toBe('example.com');
    expect(result!.path).toBe('/other');
  });
});