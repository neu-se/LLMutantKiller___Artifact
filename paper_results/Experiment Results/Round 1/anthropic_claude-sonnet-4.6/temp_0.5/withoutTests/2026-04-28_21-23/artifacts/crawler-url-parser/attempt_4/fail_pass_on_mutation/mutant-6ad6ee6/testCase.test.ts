import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function', () => {
  it('should handle URL that is only a fragment identifier', () => {
    // Original: /#.*$/ strips '#section' entirely, leaving empty string ''
    // Mutated: /#.$/ does NOT match '#section' (7 chars after #), so currentUrlStr stays '#section'
    // With baseUrlStr provided, empty string resolves to baseUrl itself
    // but '#section' resolves differently
    const result = parse('#section', 'http://example.com/page');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/page');
  });
});