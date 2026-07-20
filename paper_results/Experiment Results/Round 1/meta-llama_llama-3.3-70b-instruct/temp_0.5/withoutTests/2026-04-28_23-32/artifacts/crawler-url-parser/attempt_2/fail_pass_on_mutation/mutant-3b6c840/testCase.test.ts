import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should not remove trailing slash from URL when removeTrailingSlash is false', () => {
    const url = 'https://www.example.com/path/';
    const originalResult = parse(url);
    expect(originalResult.url).not.toBe('https://www.example.com/path');
  });
});