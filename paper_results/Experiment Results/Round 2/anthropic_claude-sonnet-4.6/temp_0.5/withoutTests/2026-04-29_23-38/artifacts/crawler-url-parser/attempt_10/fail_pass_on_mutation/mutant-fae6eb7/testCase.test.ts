import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should handle baseUrl with fragment correctly', () => {
    // Direct test of the fragment stripping behavior
    // Both regexes should produce identical results for valid URLs
    // Testing with a URL where fragment stripping is critical for resolution
    const result = parse('../sibling', 'http://example.com/a/b/page#frag');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/a/sibling');
  });
});