import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function', () => {
  it('should correctly parse protocol-relative URL with fragment', () => {
    // '//example.com/page#section' gets converted to 'http://example.com/page#section'
    // Original: after /^\/\// replacement -> 'http://example.com/page#section'
    //           then /#.*$/ strips -> 'http://example.com/page'
    // Mutated: /#.$/ doesn't match 'section' (7 chars) -> stays 'http://example.com/page#section'
    //          -> URL.parse gives hash='#section', delete parsedUrl.hash removes it
    //          -> URL.format gives 'http://example.com/page'
    // Both same... 
    // BUT: what if fragment contains '?' which affects query parsing BEFORE hash deletion?
    const result = parse('//example.com/page#?foo=bar');
    expect(result).not.toBeNull();
    expect(result!.search).toBeNull();
    expect(result!.querycount).toBe(0);
    expect(result!.url).toBe('http://example.com/page');
  });
});