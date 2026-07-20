import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return correct type when linkurl and pageurl have the same path with index file and multiple character extension', () => {
    const linkurl = { path: '/aaa/bbb/ccc/index.html' };
    const pageurl = { path: '/aaa/bbb/ccc' };
    expect(gettype(linkurl, pageurl)).toBe('samelevel');
    const linkurl2 = { path: '/aaa/bbb/ccc/index.htmll' };
    expect(gettype(linkurl2, pageurl)).toBe('samelevel');
  });
});