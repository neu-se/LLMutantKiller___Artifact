import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly handle URL with plus sign in query parameter and fragment', () => {
    const url = 'https://www.example.com/path?a=1&b=hello+world#fragment';
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.search).toBe('?a=1&b=hello world');
  });
});