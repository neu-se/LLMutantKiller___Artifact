import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should return the correct url when removeTrailingSlash is true', () => {
    const url = 'http://example.com/path/';
    const result = parse(url);
    expect(result.url).toBe('http://example.com/path');
  });
});