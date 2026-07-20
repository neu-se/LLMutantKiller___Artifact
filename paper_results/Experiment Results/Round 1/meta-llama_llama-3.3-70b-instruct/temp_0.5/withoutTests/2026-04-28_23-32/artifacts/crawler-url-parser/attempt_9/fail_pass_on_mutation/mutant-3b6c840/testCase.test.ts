import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should have trailing slash in parsed URL when removeTrailingSlash is false', () => {
    const url = 'https://www.example.com/path/';
    const result = parse(url);
    if (result !== null && result.url !== null) {
      expect(result.url).toMatch(/\/$/);
    } else {
      throw new Error('parse function returned null');
    }
  });
});