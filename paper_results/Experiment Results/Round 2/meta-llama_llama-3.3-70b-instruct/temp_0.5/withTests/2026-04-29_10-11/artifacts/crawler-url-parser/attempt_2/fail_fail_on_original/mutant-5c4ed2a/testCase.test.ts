import { parse } from '../../../crawler-url-parser';

describe('parse function', () => {
  it('should correctly parse URL with fragment', () => {
    const url = 'http://example.com/path?a=1#fragment';
    const result = parse(url);
    expect(result.url).toBe('http://example.com/path?a=1');
  });

  it('should fail when URL has a fragment with only one character', () => {
    const url = 'http://example.com/path?a=1#f';
    const result = parse(url);
    expect(result.url).toBe('http://example.com/path?a=1');
  });
});