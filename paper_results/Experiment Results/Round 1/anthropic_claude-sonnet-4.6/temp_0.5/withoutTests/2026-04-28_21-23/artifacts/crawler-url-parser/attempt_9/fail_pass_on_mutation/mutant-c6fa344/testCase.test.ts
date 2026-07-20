import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should handle URL with no protocol and no base URL', () => {
    const result = parse('sub.example.com/path');
    expect(result).not.toBeNull();
    expect(result?.url).toBe('http://sub.example.com/path');
    expect(result?.host).toBe('sub.example.com');
    expect(result?.domain).toBe('example.com');
    expect(result?.subdomain).toBe('sub');
  });
});