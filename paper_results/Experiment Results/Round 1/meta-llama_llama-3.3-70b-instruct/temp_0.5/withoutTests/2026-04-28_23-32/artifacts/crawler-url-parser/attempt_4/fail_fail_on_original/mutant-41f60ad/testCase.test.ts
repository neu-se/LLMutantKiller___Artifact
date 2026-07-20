import { parse } from './crawler-url-parser';

describe('parse function', () => {
  it('should correctly parse URL query parameters when strictQueryParsing is enabled', () => {
    const url = 'https://example.com/path?a=1&b=2&c=d=e';
    const result = parse(url);
    expect(result.querycount).toBe(3);
  });
});