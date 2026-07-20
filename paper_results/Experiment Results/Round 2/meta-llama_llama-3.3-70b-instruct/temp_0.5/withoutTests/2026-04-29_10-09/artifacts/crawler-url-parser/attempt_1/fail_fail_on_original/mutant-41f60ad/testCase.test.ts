import { parse } from '../../../crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly parse URLs with query parameters', () => {
    const url = 'https://www.example.com/path?a=1&b=2';
    const result = parse(url);
    expect(result.querycount).toBe(2);
    expect(result.search).toBe('?a=1&b=2');
  });
});