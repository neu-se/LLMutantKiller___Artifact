import { parse } from '../crawler-url-parser';

describe('parse function', () => {
  it('should correctly parse URL with base URL containing a fragment', () => {
    const url = 'http://example.com/path';
    const baseUrl = 'http://example.com/base#fragment';
    const result = parse(url, baseUrl);
    expect(result.baseurl).toBe('http://example.com/base');
  });

  it('should not remove only the first character of the fragment', () => {
    const url = 'http://example.com/path';
    const baseUrl = 'http://example.com/base#fragment';
    const result = parse(url, baseUrl);
    expect(result.baseurl).not.toBe('http://example.com/base#ragment');
  });
});