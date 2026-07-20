import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with URL normalization', () => {
  it('should handle URLs with fragments correctly', () => {
    const url = 'http://example.com/path#fragment';
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.url).not.toContain('#fragment');
      expect(result.search).toBe('');
    }
  });
});