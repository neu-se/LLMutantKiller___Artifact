import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should handle baseUrl with fragment correctly', () => {
    // Test with a URL where the fragment contains characters that might
    // interact differently with $ anchor vs no anchor
    const baseUrl = 'http://example.com/path/#section-1';
    const result = parse('other', baseUrl);
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/path/other');
  });
});