import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should parse URL with fragment', () => {
    const url = 'https://www.example.com/path#fragment';
    const result = parse(url);
    expect(result.url).toBe('https://www.example.com/path');
  });
});