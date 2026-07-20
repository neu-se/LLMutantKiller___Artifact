import { parse } from './crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs with fragments', () => {
    const url = 'http://example.com/path#fragment';
    const baseUrl = 'http://example.com#anchor';
    const result = parse(url, baseUrl);
    expect(result.baseurl).toBe('http://example.com');
  });
});