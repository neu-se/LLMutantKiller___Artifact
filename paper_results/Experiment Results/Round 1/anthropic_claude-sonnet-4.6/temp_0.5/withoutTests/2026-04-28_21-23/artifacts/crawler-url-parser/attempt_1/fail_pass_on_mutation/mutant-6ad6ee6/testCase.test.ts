import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function', () => {
  it('should strip fragment with multiple characters after # from URL', () => {
    // The mutation changes /#.*$/ to /#.$/ which only matches # followed by exactly one character
    // A URL with a fragment of 2+ characters should have the fragment stripped in original
    // but NOT in the mutated version
    const result = parse('http://example.com/page#section1');
    // In original: fragment is stripped, URL becomes 'http://example.com/page'
    // In mutated: /#.$/ only matches single char after #, so '#section1' (8 chars) is NOT stripped
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/page');
  });
});