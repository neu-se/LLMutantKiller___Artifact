import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse relative URL', () => {
  it('should correctly parse relative URL with no query string against base URL', () => {
    const result = parse('path', 'http://www.example.com/base/?q=existing');
    expect(result).not.toBeNull();
    if (result) {
      expect(result.url).toBe('http://www.example.com/base/path');
    }
  });
});