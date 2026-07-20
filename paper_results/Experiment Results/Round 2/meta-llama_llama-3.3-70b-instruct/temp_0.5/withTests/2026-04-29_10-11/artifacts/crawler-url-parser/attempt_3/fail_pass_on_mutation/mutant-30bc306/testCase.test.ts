import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return correct type when linkurl and pageurl have the same path with index file and no trailing slash', () => {
    const linkurl = { path: '/aaa/bbb/ccc/index.html' };
    const pageurl = { path: '/aaa/bbb/ccc' };
    expect(gettype(linkurl, pageurl)).toBe('samelevel');
  });

  it('should return correct type when linkurl and pageurl have the same path with default file and no trailing slash', () => {
    const linkurl = { path: '/aaa/bbb/ccc/default.html' };
    const pageurl = { path: '/aaa/bbb/ccc' };
    expect(gettype(linkurl, pageurl)).toBe('samelevel');
  });
});