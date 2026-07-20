import { gettype } from '../crawler-url-parser.js';

describe('gettype function', () => {
  it('should return internal type for different URLs', () => {
    const linkurl = 'http://example.com/aaa/bbb/ccc';
    const pageurl = 'http://example.com/aaa/bbb/ddd';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('internal');

    const linkurl2 = 'http://example.com/aaa/bbb/';
    const pageurl2 = 'http://example.com/aaa/bbb/';
    const result2 = gettype(linkurl2, pageurl2);
    expect(result2).toBe('samelevel');
  });
});