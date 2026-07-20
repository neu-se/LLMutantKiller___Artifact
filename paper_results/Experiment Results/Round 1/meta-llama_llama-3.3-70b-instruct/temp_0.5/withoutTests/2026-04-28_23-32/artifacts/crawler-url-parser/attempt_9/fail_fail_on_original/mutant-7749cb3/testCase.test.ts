import { gettype } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('gettype function', () => {
  it('should correctly handle the replacement of default.[a-z]+$ in pageurl_path', () => {
    const linkurl = 'http://example.com/path/to/default.html';
    const pageurl = 'http://example.com/path/to/default.html';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');
  });
});