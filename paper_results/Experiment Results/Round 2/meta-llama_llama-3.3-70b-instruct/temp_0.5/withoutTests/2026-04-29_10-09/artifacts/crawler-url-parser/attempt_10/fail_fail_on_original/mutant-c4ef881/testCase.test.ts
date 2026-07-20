import { gettype } from '../../../crawler-url-parser';

describe('gettype function', () => {
  it('should return samelevel for same URLs', () => {
    const linkurl = 'http://example.com/aaa/bbb/';
    const pageurl = 'http://example.com/aaa/bbb/';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');
    const linkurl2 = 'http://example.com/aaa/bbb/';
    const pageurl2 = 'http://example.com/aaa/bbb/ccc';
    const result2 = gettype(linkurl2, pageurl2);
    expect(result2).not.toBe('samelevel');
  });
});