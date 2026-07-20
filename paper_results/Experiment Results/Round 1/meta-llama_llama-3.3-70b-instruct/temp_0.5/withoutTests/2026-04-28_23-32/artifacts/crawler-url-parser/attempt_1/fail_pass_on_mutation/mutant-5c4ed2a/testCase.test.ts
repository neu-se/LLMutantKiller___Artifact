import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly handle URLs with fragment identifiers', () => {
    const url = 'http://example.com/path#anchor';
    const baseUrl = 'http://example.com';
    const result = parse(url, baseUrl);
    expect(result).not.toBeNull();
    expect(result.url).toBe('http://example.com/path');
  });
});