import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse URL querycount', () => {
  it('should return querycount of 1 for URL with single query parameter', () => {
    const result = parse('http://www.example.com/path?key=value');
    expect(result).not.toBeNull();
    if (result) {
      expect(result.querycount).toBe(1);
    }
  });
});