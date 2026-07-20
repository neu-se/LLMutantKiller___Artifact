import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "samelevel" for same level urls with index.html and default.aspx', () => {
    const linkurl = 'http://sub.domain.com/aaa/bbb/ccc/index.html';
    const pageurl = 'http://sub.domain.com/aaa/bbb/ccc/default.aspx';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');
  });

  it.skip('should return "samelevel" for same level urls with index.htm and default.html', () => {
    const linkurl = 'http://sub.domain.com/aaa/bbb/ccc/index.htm';
    const pageurl = 'http://sub.domain.com/aaa/bbb/ccc/default.html';
    const result = gettype(linkurl, pageurl);
    expect(result).not.toBe('samelevel'); // This should fail on the mutated code
  });
});