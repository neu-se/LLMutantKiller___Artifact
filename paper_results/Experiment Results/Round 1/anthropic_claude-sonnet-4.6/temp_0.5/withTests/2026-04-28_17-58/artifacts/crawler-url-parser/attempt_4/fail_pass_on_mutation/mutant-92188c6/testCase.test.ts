import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse URL', () => {
  it('should parse URL with query string correctly', () => {
    const result = parse('http://www.example.com/path?q=value');
    expect(result).not.toBeNull();
    if (result) {
      expect(result.url).toBe('http://www.example.com/path?q=value');
      expect(result.search).toBe('?q=value');
      expect(result.querycount).toBe(1);
    }
  });
});