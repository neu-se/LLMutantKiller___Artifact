import { gettype } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('gettype function', () => {
  it('should return correct type for same level URLs', () => {
    const linkurl = 'http://example.com/aaa/bbb/';
    const pageurl = 'http://example.com/aaa/bbb/';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');

    const linkurl2 = 'http://example.com/aaa/bbb/ccc';
    const pageurl2 = 'http://example.com/aaa/bbb/ddd';
    const result2 = gettype(linkurl2, pageurl2);
    expect(result2).not.toBe('samelevel');
  });
});