import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with URL normalization', () => {
  it('should handle URLs with query parameters containing utm_*', () => {
    const url = 'http://example.com/path?utm_source=test&ref=other';
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.search).toBe('?ref=other');
    }
  });
});