import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly handle URLs with fragment identifiers', () => {
    const url = 'http://example.com/path';
    const baseUrl = 'http://example.com#abcdef';
    const result = parse(url, baseUrl);
    expect(result).not.toBeNull();
    expect(result.url).toBe('http://example.com/path');
    // Unfortunately, we cannot test the baseUrlStr variable directly
    // But we can test the behavior of the parse function
    const result2 = parse(url, 'http://example.com#abc');
    expect(result2).not.toBeNull();
    expect(result2.baseurl).toBe('http://example.com');
  });
});