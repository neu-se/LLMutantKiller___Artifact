import { parse } from '../crawler-url-parser.js';

describe('parse function', () => {
  it('should handle URLs without protocols correctly', () => {
    const url = 'http:example.com';
    const result = parse(url);
    expect(result).toBeNull();
  });
});