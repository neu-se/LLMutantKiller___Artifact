import { parse } from '../crawler-url-parser.js';

describe('parse function', () => {
  it('should handle URLs without protocols correctly', () => {
    const url = 'example.com';
    const resultOriginal = parse(url);
    expect(resultOriginal).not.toBeNull();
    expect(resultOriginal.url).toBe('http://example.com');
  });
});