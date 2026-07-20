import { parse } from '../crawler-url-parser.js';

describe('parse function', () => {
  it('should handle URLs without protocols correctly', () => {
    const url = 'example.com';
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.url).toBe('http://example.com');
  });
});