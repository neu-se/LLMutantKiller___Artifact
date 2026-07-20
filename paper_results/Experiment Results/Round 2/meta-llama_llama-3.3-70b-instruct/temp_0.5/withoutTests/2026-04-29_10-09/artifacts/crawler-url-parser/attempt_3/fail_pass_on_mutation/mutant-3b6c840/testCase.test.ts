import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should not remove trailing slash from URL when removeTrailingSlash is false', () => {
    const url = 'https://www.example.com/path/';
    const result = parse(url);
    if (result === null) {
      throw new Error('parse returned null');
    }
    expect(result.url).toBe('https://www.example.com/path/');
  });
});