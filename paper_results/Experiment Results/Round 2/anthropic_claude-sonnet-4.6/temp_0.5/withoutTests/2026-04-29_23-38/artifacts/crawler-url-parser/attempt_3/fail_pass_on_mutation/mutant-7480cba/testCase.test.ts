import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should not prepend http:// to localhost:// URL', () => {
    const result = parse('localhost://something.com');
    // Original: returns null (localhost: is not http/https protocol)
    // Mutated: returns object with url containing http://localhost
    if (result !== null) {
      expect(result.url).not.toContain('http://localhost://');
    } else {
      expect(result).toBeNull();
    }
  });
});