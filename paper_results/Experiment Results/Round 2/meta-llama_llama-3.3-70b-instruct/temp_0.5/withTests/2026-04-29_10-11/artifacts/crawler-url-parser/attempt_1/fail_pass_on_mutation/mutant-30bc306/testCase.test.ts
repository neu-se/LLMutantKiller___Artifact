import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "samelevel" when linkurl and pageurl have the same path', () => {
    const linkurl = { path: '/aaa/bbb/ccc' };
    const pageurl = { path: '/aaa/bbb/ccc' };
    expect(gettype(linkurl, pageurl)).toBe('samelevel');
  });

  it('should return "samelevel" when linkurl and pageurl have the same path with trailing slash', () => {
    const linkurl = { path: '/aaa/bbb/ccc/' };
    const pageurl = { path: '/aaa/bbb/ccc/' };
    expect(gettype(linkurl, pageurl)).toBe('samelevel');
  });

  it('should return "samelevel" when linkurl and pageurl have the same path with index file', () => {
    const linkurl = { path: '/aaa/bbb/ccc/index.html' };
    const pageurl = { path: '/aaa/bbb/ccc' };
    expect(gettype(linkurl, pageurl)).toBe('samelevel');
  });

  it('should return "samelevel" when linkurl and pageurl have the same path with default file', () => {
    const linkurl = { path: '/aaa/bbb/ccc/default.html' };
    const pageurl = { path: '/aaa/bbb/ccc' };
    expect(gettype(linkurl, pageurl)).toBe('samelevel');
  });

  it('should return "samelevel" when linkurl and pageurl have the same path with index file and trailing slash', () => {
    const linkurl = { path: '/aaa/bbb/ccc/index.html' };
    const pageurl = { path: '/aaa/bbb/ccc/' };
    expect(gettype(linkurl, pageurl)).toBe('samelevel');
  });

  it('should return "samelevel" when linkurl and pageurl have the same path with default file and trailing slash', () => {
    const linkurl = { path: '/aaa/bbb/ccc/default.html' };
    const pageurl = { path: '/aaa/bbb/ccc/' };
    expect(gettype(linkurl, pageurl)).toBe('samelevel');
  });
});