import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return correct type for url with default.htm', () => {
    const linkurl = 'http://sub.domain.com/aaa/bbb/ccc/default.htm';
    const pageurl = 'http://sub.domain.com/aaa/bbb/ccc/index.html';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');
  });
});