import { gettype } from '../../crawler-url-parser';

describe('gettype function', () => {
  it('should not return samelevel for different URLs', () => {
    const linkurl = 'http://example.com/aaa/bbb/';
    const pageurl = 'http://example.com/aaa/bbb/ccc';
    const result = gettype(linkurl, pageurl);
    expect(result).not.toBe('samelevel');
  });
});