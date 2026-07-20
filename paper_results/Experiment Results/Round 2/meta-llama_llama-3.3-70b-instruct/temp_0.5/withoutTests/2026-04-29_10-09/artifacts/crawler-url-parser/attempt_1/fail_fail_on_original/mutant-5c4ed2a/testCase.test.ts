import { parse } from '../../../crawler-url-parser.js';

describe('parse function', () => {
  it('should handle URLs with fragments correctly', () => {
    const url = 'https://www.example.com/path#fragment';
    const baseUrl = 'https://www.example.com';

    const result = parse(url, baseUrl);
    expect(result.url).toBe('https://www.example.com/path');
  });
});