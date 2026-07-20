import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly handle search parameters with fragments', () => {
    const url = 'https://www.example.com/path?a=1#fragment&b=2';
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.search).toBe('?a=1');
  });
});