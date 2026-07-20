import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should preserve trailing slash behavior when removeTrailingSlash is true', () => {
    const url = 'https://www.example.com/path/';
    const result = parse(url);
    const urlWithoutTrailingSlash = 'https://www.example.com/path';
    const resultWithoutTrailingSlash = parse(urlWithoutTrailingSlash);
    expect(result.url).not.toBe(resultWithoutTrailingSlash.url);
  });
});