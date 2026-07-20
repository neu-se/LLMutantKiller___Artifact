import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse URL', () => {
  it('should parse querycount correctly for URL without query string', () => {
    const result = parse('newpath', 'http://www.example.com/base/');
    expect(result).not.toBeNull();
    if (result) {
      expect(result.querycount).toBe(0);
      expect(result.search).toBeNull();
    }
  });
});