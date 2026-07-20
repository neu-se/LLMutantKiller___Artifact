import { parse } from './crawler-url-parser';

describe('parse function', () => {
  it('should correctly parse URL query parameters when strictQueryParsing is enabled', () => {
    const url = 'https://example.com/path?a=1&b=2&c=d=e';
    const result = parse(url);
    const queryParts = result.search.split('&');
    expect(queryParts.length).toBe(3);
    expect(queryParts[0].startsWith('a=')).toBe(true);
    expect(queryParts[1].startsWith('b=')).toBe(true);
    expect(queryParts[2].startsWith('c=')).toBe(true);
  });
});