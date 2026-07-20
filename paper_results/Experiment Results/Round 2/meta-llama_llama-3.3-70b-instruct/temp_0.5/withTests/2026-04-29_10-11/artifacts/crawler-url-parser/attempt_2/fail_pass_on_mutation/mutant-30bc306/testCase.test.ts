import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "samelevel" when linkurl and pageurl have the same path with index file', () => {
    const linkurl = { path: '/aaa/bbb/ccc/index.htm' };
    const pageurl = { path: '/aaa/bbb/ccc' };
    expect(gettype(linkurl, pageurl)).toBe('samelevel');
  });

  it('should return "samelevel" when linkurl and pageurl have the same path with default file', () => {
    const linkurl = { path: '/aaa/bbb/ccc/default.htm' };
    const pageurl = { path: '/aaa/bbb/ccc' };
    expect(gettype(linkurl, pageurl)).toBe('samelevel');
  });
});