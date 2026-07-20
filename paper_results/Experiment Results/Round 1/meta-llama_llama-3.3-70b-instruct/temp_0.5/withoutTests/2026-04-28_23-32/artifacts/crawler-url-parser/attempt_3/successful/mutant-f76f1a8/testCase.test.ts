import { gettype } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('gettype function', () => {
  it('should return correct type for links with default page', () => {
    const linkurl = 'http://example.com/path/default.htm';
    const pageurl = 'http://example.com/path/default.html';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');
    const linkurl2 = 'http://example.com/path/default.html';
    const pageurl2 = 'http://example.com/path/default.htm';
    const result2 = gettype(linkurl2, pageurl2);
    expect(result2).toBe('samelevel');
  });
});