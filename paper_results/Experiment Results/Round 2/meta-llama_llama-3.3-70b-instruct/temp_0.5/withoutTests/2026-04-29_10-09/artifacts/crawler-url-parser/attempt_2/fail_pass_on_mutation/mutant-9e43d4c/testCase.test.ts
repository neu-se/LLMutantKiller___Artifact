import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly parse URL with fragment', () => {
    const url = 'https://www.example.com/path?query#fragment';
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.url).toBe('https://www.example.com/path?query');
    expect(result.search).toBe('?query');
  });
});