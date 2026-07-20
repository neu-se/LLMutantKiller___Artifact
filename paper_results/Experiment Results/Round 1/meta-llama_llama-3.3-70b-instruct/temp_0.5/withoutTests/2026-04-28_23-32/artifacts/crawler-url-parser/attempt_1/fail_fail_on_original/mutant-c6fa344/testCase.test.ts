import { parse } from '../../../crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs without a protocol', () => {
    const url = 'www.example.com/path/to/resource';
    const expectedUrl = 'http://www.example.com/path/to/resource';
    const result = parse(url);
    expect(result.url).toBe(expectedUrl);
  });
});