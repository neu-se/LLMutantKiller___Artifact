import { parse } from './crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs without a protocol', () => {
    const url = '//example.com/path/to/resource';
    const result = parse(url);
    expect(result).toBeNull();
  });
});