import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly handle URLs with fragment identifiers', () => {
    const url = 'http://example.com/path';
    const baseUrl = 'http://example.com#abcdef';
    const result = parse(url, baseUrl);
    expect(result).not.toBeNull();
    expect(result.baseurl).toBeNull();
    const result2 = parse(url, 'http://example.com');
    expect(result2).not.toBeNull();
    expect(result2.baseurl).toBe('http://example.com');
  });
});