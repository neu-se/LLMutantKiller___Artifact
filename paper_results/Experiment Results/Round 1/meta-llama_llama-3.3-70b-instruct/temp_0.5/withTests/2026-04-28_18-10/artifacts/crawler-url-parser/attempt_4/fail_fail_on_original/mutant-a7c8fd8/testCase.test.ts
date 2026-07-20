import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "samelevel" for same level urls with index.html and default.html', () => {
    const linkurl = 'http://sub.domain.com/aaa/bbb/ccc/index.html';
    const pageurl = 'http://sub.domain.com/aaa/bbb/ccc/default.html';
    linkurl_path = linkurl.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
    pageurl_path = pageurl.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');
  });

  it('should return "samelevel" for same level urls with index.htm and default.htm', () => {
    const linkurl = 'http://sub.domain.com/aaa/bbb/ccc/index.htm';
    const pageurl = 'http://sub.domain.com/aaa/bbb/ccc/default.htm';
    linkurl_path = linkurl.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
    pageurl_path = pageurl.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');
  });
});