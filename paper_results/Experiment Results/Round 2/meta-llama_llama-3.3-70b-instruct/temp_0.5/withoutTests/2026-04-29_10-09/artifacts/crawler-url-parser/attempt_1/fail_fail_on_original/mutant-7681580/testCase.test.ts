import { parse } from '../../crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs without a protocol', () => {
    const url = 'www.example.com';
    const expectedUrl = 'http://www.example.com';
    const result = parse(url);
    expect(result.url).toBe(expectedUrl);
  });
});