import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "samelevel" for same level urls', () => {
    const linkurl = 'http://sub.domain.com/aaa/bbb/ccc/index.html';
    const pageurl = 'http://sub.domain.com/aaa/bbb/ccc/default.html';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');
  });

  it('should return "samelevel" for same level urls with trailing slash', () => {
    const linkurl = 'http://sub.domain.com/aaa/bbb/ccc/index.html';
    const pageurl = 'http://sub.domain.com/aaa/bbb/ccc/default.aspx';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');
  });
});