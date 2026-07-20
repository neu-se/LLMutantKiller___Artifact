import { parse } from '../../../crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly parse URLs with fragments', () => {
    const url = 'https://www.example.com/path#fragment';
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.url).toBe('https://www.example.com/path');
    expect(result.search).toBe('');
    expect(result.querycount).toBe(0);
  });
});