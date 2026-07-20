import { parse } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly parse URL with base URL containing a fragment', () => {
    const url = 'http://example.com/path';
    const baseUrl = 'http://example.com/base#fragment';
    const result = parse(url, baseUrl);
    expect(result.baseurl).toBe('http://example.com/base');
  });
});