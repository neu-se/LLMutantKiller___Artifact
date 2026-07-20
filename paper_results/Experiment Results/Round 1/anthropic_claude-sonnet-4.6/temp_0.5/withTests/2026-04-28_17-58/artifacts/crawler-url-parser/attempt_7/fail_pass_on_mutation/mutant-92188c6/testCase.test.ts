import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse relative URL with equals sign in query value', () => {
  it('should correctly handle equals sign in query parameter value', () => {
    const result = parse('path?a=b=c', 'http://www.example.com/base/');
    expect(result).not.toBeNull();
    if (result) {
      expect(result.url).toBe('http://www.example.com/base/path?a=b=c');
    }
  });
});