import { gettype } from '../crawler-url-parser';

describe('gettype function', () => {
  it('should return samelevel for same URLs', () => {
    const linkurl = 'http://example.com/aaa/bbb/';
    const pageurl = 'http://example.com/aaa/bbb/';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');
  });
});