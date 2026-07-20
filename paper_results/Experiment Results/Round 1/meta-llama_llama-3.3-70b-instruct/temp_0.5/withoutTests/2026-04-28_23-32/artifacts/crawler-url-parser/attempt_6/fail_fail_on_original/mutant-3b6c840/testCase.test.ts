import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should not have trailing slash in parsed URL', () => {
    const url = 'https://www.example.com/path/';
    const result = parse(url);
    if (result !== null) {
      expect(result.url.endsWith('/')).toBe(false);
    } else {
      throw new Error('parse function returned null');
    }
  });
});