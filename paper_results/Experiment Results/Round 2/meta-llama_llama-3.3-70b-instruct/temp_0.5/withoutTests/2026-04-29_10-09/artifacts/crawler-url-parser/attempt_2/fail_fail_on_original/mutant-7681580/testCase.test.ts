import { parse } from './crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs without a protocol', () => {
    const url = 'example.com';
    const expectedUrl = 'http://example.com';
    const result = parse(url);
    expect(result.url).toBe(expectedUrl);
  });
});