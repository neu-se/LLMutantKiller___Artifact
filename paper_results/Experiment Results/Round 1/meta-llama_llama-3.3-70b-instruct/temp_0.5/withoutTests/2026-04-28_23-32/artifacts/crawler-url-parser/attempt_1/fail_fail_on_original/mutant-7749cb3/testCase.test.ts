import { gettype } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('gettype function', () => {
  it('should correctly handle the replacement of default.[a-z]+$ in pageurl_path', () => {
    const linkurl = 'http://example.com/path/to/default.html';
    const pageurl = 'http://example.com/path/to/default.html';
    const expectedType = 'samelevel';

    const originalPageurlPath = pageurl.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
    const mutatedPageurlPath = pageurl.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+/, '/');

    const originalType = gettype(linkurl, pageurl);
    const mutatedType = gettype(linkurl, pageurl);

    expect(originalType).toBe(expectedType);
    expect(mutatedType).not.toBe(expectedType);
  });
});