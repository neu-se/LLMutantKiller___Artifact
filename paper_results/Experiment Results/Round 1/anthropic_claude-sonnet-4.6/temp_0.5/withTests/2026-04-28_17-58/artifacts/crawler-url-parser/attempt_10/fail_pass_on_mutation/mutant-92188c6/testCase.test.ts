import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse URL with slashes prefix', () => {
  it('should correctly parse protocol-relative URL with query string', () => {
    const result = parse('//www.example.com/path?q1=val1&q2=val2');
    expect(result).not.toBeNull();
    if (result) {
      expect(result.protocol).toBe('http:');
      expect(result.host).toBe('www.example.com');
      expect(result.search).toBe('?q1=val1&q2=val2');
      expect(result.querycount).toBe(2);
      expect(result.url).toBe('http://www.example.com/path?q1=val1&q2=val2');
    }
  });
});