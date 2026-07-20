import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should remove trailing slash from URL', () => {
    const url = 'https://www.example.com/path/';
    const result = parse(url);
    if (result !== null) {
      expect(result.url).toBe('https://www.example.com/path');
    } else {
      throw new Error('parse function returned null');
    }
  });
});