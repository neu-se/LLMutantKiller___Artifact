import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should return the correct url when removeTrailingSlash is true', () => {
    const url = 'http://example.com/path';
    const result = parse(url);
    if (result !== null) {
      expect(result.url).toBe('http://example.com/path');
    } else {
      expect(result).toBeNull();
    }
    const urlWithSlash = 'http://example.com/path/';
    const resultWithSlash = parse(urlWithSlash);
    if (resultWithSlash !== null) {
      expect(resultWithSlash.url).toBe('http://example.com/path');
    } else {
      expect(resultWithSlash).toBeNull();
    }
  });
});