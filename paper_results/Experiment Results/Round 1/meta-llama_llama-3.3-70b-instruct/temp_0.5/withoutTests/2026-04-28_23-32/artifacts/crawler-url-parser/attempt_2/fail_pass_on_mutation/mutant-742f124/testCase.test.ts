import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should strip fragment when parsing URL', () => {
    const url = 'https://www.example.com/path#fragment';
    const result = parse(url);
    expect(result.url).not.toContain('#');
    expect(result.url).toBe('https://www.example.com/path');
  });
});