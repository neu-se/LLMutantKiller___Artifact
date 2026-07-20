import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should handle base URL with multiple leading slashes', () => {
    // baseUrlStr = '////example.com/path'
    // After replace(/^\/\//, 'http://'): 'http:////example.com/path'  
    // URL.parse('http:////example.com/path', true, true) vs (true, false) may differ
    const result = parse('page', '////example.com/path/');
    expect(result).not.toBeNull();
    expect((result as any).host).toBe('example.com');
  });
});