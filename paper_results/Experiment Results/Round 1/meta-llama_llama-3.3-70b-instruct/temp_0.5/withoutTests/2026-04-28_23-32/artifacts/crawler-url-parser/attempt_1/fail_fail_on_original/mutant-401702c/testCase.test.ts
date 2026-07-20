import { parse } from '../../../crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs starting with a protocol', () => {
    const url = 'ftp://example.com';
    const result = parse(url);
    expect(result).toBeNull();
  });
});