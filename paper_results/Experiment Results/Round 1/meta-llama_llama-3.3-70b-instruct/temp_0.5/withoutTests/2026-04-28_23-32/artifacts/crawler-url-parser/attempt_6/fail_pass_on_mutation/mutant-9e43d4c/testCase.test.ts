import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly parse URLs with query parameters and fragments', () => {
    const url = 'https://www.example.com/path?a=1&b=2#fragment';
    const result = parse(url);
    if (result === null) {
      throw new Error('Result is null');
    }
    expect(result.hash).toBeUndefined();
  });
});