import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly handle URLs with fragment identifiers', () => {
    const url = 'http://example.com/path';
    const baseUrl = 'http://example.com#abc';
    const result = parse(url, baseUrl);
    expect(result).not.toBeNull();
    expect(result.baseurl).toBe('http://example.com');
  });
});