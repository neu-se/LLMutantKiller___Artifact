import { parse } from '../crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs without protocol', () => {
    const url = 'example.com';
    const baseUrl = undefined;
    const result = parse(url, baseUrl);
    expect(result.url).toBe('http://example.com');
  });
});