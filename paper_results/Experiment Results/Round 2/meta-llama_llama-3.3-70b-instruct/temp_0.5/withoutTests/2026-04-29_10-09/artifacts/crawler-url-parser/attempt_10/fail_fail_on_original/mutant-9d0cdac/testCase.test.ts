import { parse } from '../../crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs with protocol', () => {
    const url = 'http://example.com';
    const result = parse(url);
    expect(result.url).toBe('http://example.com');
    const mutatedUrl = 'http:example.com';
    const mutatedResult = parse(mutatedUrl);
    expect(mutatedResult).toBeNull();
  });
});