import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should remove trailing slash when parsing URL', () => {
    const urlWithTrailingSlash = 'https://www.example.com/path/';
    const urlWithoutTrailingSlash = 'https://www.example.com/path';
    const resultWithTrailingSlash = parse(urlWithTrailingSlash);
    const resultWithoutTrailingSlash = parse(urlWithoutTrailingSlash);
    if (resultWithTrailingSlash !== null && resultWithoutTrailingSlash !== null) {
      expect(resultWithTrailingSlash.url).toBe(resultWithoutTrailingSlash.url);
    } else {
      throw new Error('parse function returned null');
    }
  });
});