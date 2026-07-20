import { parse } from './crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs with fragments in the base URL', () => {
    const url = 'http://example.com/path';
    const baseUrl = 'http://example.com/base#anchor';
    const result = parse(url, baseUrl);
    const expectedBaseUrl = 'http://example.com/base#anchor'.replace(/#.*$/, '');
    expect(result.baseurl).toBe(expectedBaseUrl);
  });
});