import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should correctly strip fragment from baseUrl containing only a fragment identifier', () => {
    // Test where baseUrl fragment stripping is critical
    const result = parse('http://other.com/page', 'http://example.com/#section');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://other.com/page');
  });
});