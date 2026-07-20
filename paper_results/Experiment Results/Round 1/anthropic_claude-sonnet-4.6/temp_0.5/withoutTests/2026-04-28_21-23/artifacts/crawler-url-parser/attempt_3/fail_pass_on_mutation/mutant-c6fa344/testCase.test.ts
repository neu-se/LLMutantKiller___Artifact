import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should handle edge case URL', () => {
    // Test with a URL that exercises the http:// prepending logic
    const result = parse('example.com');
    expect(result?.url).toBe('http://example.com/');
  });
});