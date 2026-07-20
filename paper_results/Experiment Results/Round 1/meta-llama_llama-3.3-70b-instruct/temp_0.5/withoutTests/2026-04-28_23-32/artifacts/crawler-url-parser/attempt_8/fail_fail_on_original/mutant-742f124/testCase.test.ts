import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should parse URL with fragment when stripFragment is true', () => {
    result_normalize_options.stripFragment = true;
    const url = 'https://www.example.com/path#fragment';
    const result = parse(url);
    expect(result.url).toBe('https://www.example.com/path');
  });

  it('should parse URL with fragment when stripFragment is false', () => {
    result_normalize_options.stripFragment = false;
    const url = 'https://www.example.com/path#fragment';
    const result = parse(url);
    expect(result.url).toBe('https://www.example.com/path#fragment');
  });
});