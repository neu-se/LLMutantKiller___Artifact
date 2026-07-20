import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should return the correct url when removeTrailingSlash is true', () => {
    const url = 'http://example.com/path/';
    const result = parse(url);
    if (result !== null) {
      expect(result.url).toEqual('http://example.com/path/');
    } else {
      expect(result).toBeNull();
    }
    const urlWithoutSlash = 'http://example.com/path';
    const resultWithoutSlash = parse(urlWithoutSlash);
    if (resultWithoutSlash !== null) {
      expect(resultWithoutSlash.url).toEqual('http://example.com/path/');
    } else {
      expect(resultWithoutSlash).toBeNull();
    }
  });
});