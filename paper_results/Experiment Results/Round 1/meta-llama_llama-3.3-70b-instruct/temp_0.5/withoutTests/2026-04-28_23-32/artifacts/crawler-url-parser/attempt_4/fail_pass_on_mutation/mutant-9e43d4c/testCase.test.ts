import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly parse URLs with query parameters', () => {
    const url = 'https://www.example.com/path?a=1&b=2#fragment';
    const result = parse(url);
    if (result === null) {
      throw new Error('Result is null');
    }
    expect(result.url).toBe('https://www.example.com/path?a=1&b=2');
    expect(result.search).toBe('?a=1&b=2');
    expect(result.querycount).toBe(2);
  });
});