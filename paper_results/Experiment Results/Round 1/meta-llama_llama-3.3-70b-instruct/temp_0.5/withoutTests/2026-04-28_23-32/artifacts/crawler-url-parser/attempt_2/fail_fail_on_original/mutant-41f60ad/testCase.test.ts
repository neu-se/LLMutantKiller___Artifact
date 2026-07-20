import { parse } from './crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly parse URL query parameters when strictQueryParsing is enabled', () => {
    const url = 'https://example.com/path?a=1&b=2&c=d=e';
    const resultOriginal = parse(url);
    expect(resultOriginal.search).toBe('?a=1&b=2&c=d=e');
    expect(resultOriginal.querycount).toBe(3);
  });
});