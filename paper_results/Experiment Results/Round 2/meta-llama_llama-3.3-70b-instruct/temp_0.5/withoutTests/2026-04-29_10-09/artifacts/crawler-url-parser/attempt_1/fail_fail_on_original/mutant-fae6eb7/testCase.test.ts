import { parse } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs with fragments', () => {
    const url = 'http://example.com/path#fragment';
    const baseUrl = 'http://example.com';
    const result = parse(url, baseUrl);
    expect(result.url).toBe('http://example.com/path');
  });
});