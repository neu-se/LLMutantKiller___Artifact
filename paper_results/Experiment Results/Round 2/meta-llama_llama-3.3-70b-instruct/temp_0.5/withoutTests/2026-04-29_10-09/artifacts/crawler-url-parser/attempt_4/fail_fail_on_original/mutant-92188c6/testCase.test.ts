import { parse } from './crawler-url-parser';

describe('parse function', () => {
  it('should correctly parse a URL with query parameters', () => {
    const url = 'https://example.com/path?a=1&b=2#fragment';
    const resultOriginal = parse(url);
    expect(resultOriginal.url).toBe('https://example.com/path?a=1&b=2');
    const urlMutated = 'https://example.com/path?a=1&b=2#fragment';
    const resultMutated = parse(urlMutated);
    expect(resultMutated.url).not.toBe('https://example.com/path?a=1&b=2#fragment');
  });
});