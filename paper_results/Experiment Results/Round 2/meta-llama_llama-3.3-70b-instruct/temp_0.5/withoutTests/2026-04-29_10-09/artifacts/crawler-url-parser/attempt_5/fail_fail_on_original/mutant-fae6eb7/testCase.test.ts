import { parse } from '../crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs with fragments in the base URL', () => {
    const url = 'http://example.com/path';
    const baseUrl = 'http://example.com/base#anchor';
    const result = parse(url, baseUrl);
    expect(result.baseurl).toBe('http://example.com/base');
    expect(result.baseurl).not.toContain('#anchor');
  });
});