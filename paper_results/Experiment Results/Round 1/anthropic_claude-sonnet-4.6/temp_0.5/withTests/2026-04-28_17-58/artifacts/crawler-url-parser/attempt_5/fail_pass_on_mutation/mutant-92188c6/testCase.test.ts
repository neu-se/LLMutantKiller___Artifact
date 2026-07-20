import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse URL query string handling', () => {
  it('should not inherit base URL query string when resolving relative URL without query', () => {
    const result = parse('newpath', 'http://www.example.com/base?existing=value');
    expect(result).not.toBeNull();
    if (result) {
      expect(result.url).toBe('http://www.example.com/newpath');
      expect(result.search).toBeNull();
      expect(result.querycount).toBe(0);
    }
  });
});