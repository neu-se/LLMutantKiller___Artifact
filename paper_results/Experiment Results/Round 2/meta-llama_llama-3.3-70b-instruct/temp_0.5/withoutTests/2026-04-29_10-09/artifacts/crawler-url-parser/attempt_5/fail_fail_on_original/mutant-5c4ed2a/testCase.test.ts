import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should handle URLs with fragments correctly', () => {
    const url = 'https://www.example.com/path#fragment';
    const baseUrl = 'https://www.example.com/base#fragm';

    const result = parse(url, baseUrl);
    expect(result.baseurl).not.toBeNull();
    expect(result.baseurl).not.toBe('https://www.example.com/base#f');
  });
});