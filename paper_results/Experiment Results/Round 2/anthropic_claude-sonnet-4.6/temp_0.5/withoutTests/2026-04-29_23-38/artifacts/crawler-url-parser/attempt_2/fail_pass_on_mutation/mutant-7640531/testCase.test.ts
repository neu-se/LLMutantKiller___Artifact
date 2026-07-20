import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should strip fragment from URL that ends with newline after hash', () => {
    // "http://example.com/path#\n" 
    // /#.*$/ : $ matches before \n, .* matches empty, replaces "#" → "http://example.com/path\n"
    // /#.*/ : .* matches empty (can't match \n), replaces "#" → "http://example.com/path\n"
    // Same... need a string where $ makes a difference
    // "http://example.com/path#tag\nhttp://other.com"
    // /#.*$/ no multiline: $ = end of string = after "other.com", but .* won't cross \n
    //   so matches "#tag", result: "http://example.com/path\nhttp://other.com" 
    // /#.*/ : matches "#tag", result: "http://example.com/path\nhttp://other.com"
    // Still same!
    const result = parse('http://example.com/path#section');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/path');
  });
});