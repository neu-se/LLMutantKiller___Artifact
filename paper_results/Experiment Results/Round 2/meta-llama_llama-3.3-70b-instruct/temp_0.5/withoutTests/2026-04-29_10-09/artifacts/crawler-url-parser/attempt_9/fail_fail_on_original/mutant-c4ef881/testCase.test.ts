import { gettype } from '../../../subject_repositories/crawler-url-parser/crawler-url-parser';

describe('gettype function', () => {
  it('should return samelevel for same URLs', () => {
    const linkurl = 'http://example.com/aaa/bbb/';
    const pageurl = 'http://example.com/aaa/bbb/ccc';
    const result = gettype(linkurl, pageurl);
    expect(result).not.toBe('samelevel');
  });
});