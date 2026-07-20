import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function - fragment removal', () => {
  it('should remove fragment with multiple characters after # from URL', () => {
    // The original code uses /#.*$/ which removes # and everything after it
    // The mutated code uses /#.$/ which only removes # followed by exactly one character
    // So with a fragment like "#section1", the original removes it entirely,
    // but the mutant only removes "#s" leaving "ection1" in the URL
    const result = parse('http://example.com/page#section1');
    
    // The original should parse this cleanly without any fragment
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/page');
    // The URL should not contain any fragment characters
    expect(result!.url).not.toContain('#');
    expect(result!.url).not.toContain('section1');
  });
});