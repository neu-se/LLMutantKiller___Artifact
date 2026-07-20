import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with URL normalization', () => {
  it('should normalize https protocol to http when normalizeHttps is true', () => {
    const url = 'https://example.com/path';
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.protocol).toBe('http:');
    }
  });
});