import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should handle protocol-relative URL with fragment', () => {
    // After stripping "//", we get "example.com/path#frag"
    // Then placeholder strips "#frag" -> "example.com/path"  
    // Then line 37 strips nothing (no #)
    // Result should be valid
    const result = parse('//example.com/path#section', 'http://base.com/');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/path');
  });
});