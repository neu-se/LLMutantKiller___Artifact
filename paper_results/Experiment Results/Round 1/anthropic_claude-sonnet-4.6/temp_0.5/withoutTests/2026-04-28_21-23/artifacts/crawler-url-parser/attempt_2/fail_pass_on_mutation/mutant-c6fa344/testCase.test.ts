import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should handle protocol-relative URLs without base URL', () => {
    // A URL starting with // should be converted to http://
    // The original code's regex prevents double http:// prepending for // URLs
    // The mutated regex would allow prepending http:// to // URLs
    const result = parse('//example.com');
    expect(result).not.toBeNull();
    expect(result?.url).toBe('http://example.com/');
    expect(result?.host).toBe('example.com');
    expect(result?.protocol).toBe('http:');
  });
});