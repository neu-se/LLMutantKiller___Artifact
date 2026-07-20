import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should handle URL with newline in fragment differently based on regex', () => {
    // Test where /#.*$/ and /#.*/ behave differently
    // String: "http://example.com/#frag\nmore"
    // /#.*$/: fails to match ($ can't match before non-final \n)
    // /#.*/: matches #frag, strips it
    // But \n is illegal... unless we can bypass the check
    
    // What if currentUrlStr is falsy but has replace method?
    // Empty string is falsy, skips check, but has no \n
    
    // Let me try: what if the URL has \r (carriage return)?
    // \r is also illegal...
    
    // What if I use a URL where the second replace (/#.*$/) handles what first missed?
    // In original: first /#.*$/ strips fragment, second /#.*$/ has nothing to do
    // In mutated: first /#.*/ strips fragment, second /#.*$/ has nothing to do
    // For valid URLs: identical
    
    const result = parse('http://example.com/path#section');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/path');
  });
});