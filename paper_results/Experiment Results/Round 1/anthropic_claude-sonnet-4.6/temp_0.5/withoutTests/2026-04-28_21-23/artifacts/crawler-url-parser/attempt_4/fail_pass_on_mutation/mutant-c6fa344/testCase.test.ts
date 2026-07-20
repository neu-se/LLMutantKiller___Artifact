import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should parse protocol-relative URL correctly', () => {
    const result = parse('//example.com');
    expect(result).not.toBeNull();
    expect(result?.url).toBe('http://example.com/');
    expect(result?.host).toBe('example.com');
  });
});