import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function', () => {
  it('should correctly handle URL where fragment contains a query string', () => {
    // Original: /#.*$/ strips '#?q=fake' leaving clean URL
    // Mutated: /#.$/ only strips single char after #, so '#?q=fake' is not stripped
    // URL.parse treats #?q=fake as a hash, but without stripping, the ? inside hash
    // could be interpreted differently depending on URL parsing order
    const result = parse('http://example.com/page#?q=fake');
    expect(result).not.toBeNull();
    expect(result!.search).toBeNull();
    expect(result!.querycount).toBe(0);
  });
});