import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function with HTTPS URLs', () => {
  it('should preserve https protocol when parsing an https URL', () => {
    const result = parse('https://www.example.com/path');
    // With normalizeHttps: false (original), protocol should remain https:
    // With normalizeHttps: true (mutant), protocol would be normalized to http:
    expect(result).not.toBeNull();
    expect(result.protocol).toBe('https:');
    expect(result.url).toContain('https://');
  });
});