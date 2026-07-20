import { gettype } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('gettype function', () => {
  it('should return the correct type for a link', () => {
    const linkurl = 'http://example.com/aaa/bbb/index.html';
    const pageurl = 'http://example.com/aaa/bbb/';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');
  });
});