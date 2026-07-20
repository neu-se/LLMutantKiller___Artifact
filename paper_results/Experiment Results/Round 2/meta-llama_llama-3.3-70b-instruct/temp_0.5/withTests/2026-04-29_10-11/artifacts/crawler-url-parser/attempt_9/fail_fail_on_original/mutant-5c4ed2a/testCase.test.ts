import { parse } from '../../../crawler-url-parser';

describe('parse function', () => {
  it('should correctly parse URL with base URL containing a fragment', () => {
    const url = 'http://example.com/path';
    const baseUrl = 'http://example.com/base#fragment';
    const result = parse(url, baseUrl);
    expect(result.baseurl).toBe('http://example.com/base');
  });

  it('should fail on mutated code', () => {
    const url = 'http://example.com/path';
    const baseUrl = 'http://example.com/base#f';
    const result = parse(url, baseUrl);
    expect(result.baseurl).not.toBe('http://example.com/base#');
  });
});