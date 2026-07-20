import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return correct type for links with default file', () => {
    const linkurl = 'http://example.com/path/default.html';
    const pageurl = 'http://example.com/path/';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');
    const linkurl2 = 'http://example.com/path/default.asp';
    const pageurl2 = 'http://example.com/path/';
    const result2 = gettype(linkurl2, pageurl2);
    expect(result2).toBe('samelevel');
    const linkurl3 = 'http://example.com/path/default.html';
    const pageurl3 = 'http://example.com/path/default';
    const result3 = gettype(linkurl3, pageurl3);
    expect(result3).toBe('samelevel');
  });
});