import { parse } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly parse URL with fragment', () => {
    const url = 'http://example.com/path?a=1#fragment';
    const result = parse(url);
    expect(result.url).toBe('http://example.com/path?a=1');
  });

  it('should fail when URL has a fragment with only one character on the mutated code', () => {
    const url = 'http://example.com/path?a=1#f';
    const result = parse(url);
    expect(result.url).toBe('http://example.com/path?a=1');
  });
});