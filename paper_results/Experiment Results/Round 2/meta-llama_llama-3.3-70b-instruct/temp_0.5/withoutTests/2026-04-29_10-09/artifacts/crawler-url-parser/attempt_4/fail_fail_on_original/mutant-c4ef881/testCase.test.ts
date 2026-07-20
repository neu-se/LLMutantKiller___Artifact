import { gettype } from '../../../../crawler-url-parser.js';

describe('gettype function', () => {
  it('should return samelevel type for same URLs', () => {
    const linkurl = 'http://example.com/aaa/bbb/';
    const pageurl = 'http://example.com/aaa/bbb/ccc';
    const result = gettype(linkurl, pageurl);
    expect(result).not.toBe('samelevel');
  });
});