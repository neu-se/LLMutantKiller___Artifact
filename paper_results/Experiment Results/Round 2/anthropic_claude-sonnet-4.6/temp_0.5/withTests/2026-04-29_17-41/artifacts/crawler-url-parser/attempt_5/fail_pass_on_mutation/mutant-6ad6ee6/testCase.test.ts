import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL fragment stripping', () => {
  it('should correctly parse a URL where fragment stripping affects protocol-relative URL handling', () => {
    // "//example.com/path#section" -> replace(/^\/\//, 'http://') -> "http://example.com/path#section"
    // Original: strip fragment -> "http://example.com/path" -> ret.url = "http://example.com/path"  
    // Mutation: /#.$/ doesn't match (7 chars after #) -> "http://example.com/path#section" stays
    // URL.parse -> hash="#section" -> delete hash -> ret.url = "http://example.com/path"
    // Both same... 
    const result = parse("//example.com/path#section");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://example.com/path");
  });
});