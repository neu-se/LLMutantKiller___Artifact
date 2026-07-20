import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should resolve relative URL when base URL starts with double slash', () => {
    // baseUrlStr = '//example.com/section/' gets converted to 'http://example.com/section/'
    // Then URL.parse('http://example.com/section/', true, true/false) is called
    // The slashes property might differ
    const result = parse('page', '//example.com/section/');
    expect(result).not.toBeNull();
    expect(result?.host).toBe('example.com');
    expect(result?.url).toBe('http://example.com/section/page');
  });
});