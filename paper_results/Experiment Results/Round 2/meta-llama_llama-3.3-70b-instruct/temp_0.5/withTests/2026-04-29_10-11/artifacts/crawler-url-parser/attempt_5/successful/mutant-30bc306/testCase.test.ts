import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return correct type when linkurl and pageurl have the same path with index file and more than one character extension in linkurl and pageurl', () => {
    const linkurl = { path: '/aaa/bbb/ccc/index.htmll' };
    const pageurl = { path: '/aaa/bbb/ccc/index.htm' };
    expect(gettype(linkurl, pageurl)).toBe('samelevel');
  });
});