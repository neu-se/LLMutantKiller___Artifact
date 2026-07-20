import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return correct type', () => {
    const linkurl = 'http://sub.domain.com/aaa/bbb/ccc';
    const pageurl = 'http://sub.domain.com/aaa/bbb/';
    linkurl.replace(/\/index\.[a-z]+$/, '/');
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('sublevel');
  });

  it('should fail on mutated code', () => {
    const linkurl = 'http://sub.domain.com/aaa/bbb/ccc';
    const pageurl = 'http://sub.domain.com/aaa/bbb/Stryker was here!';
    pageurl.replace(/\/index\.[a-z]+$/, 'Stryker was here!');
    expect(() => gettype(linkurl, pageurl)).toThrow();
  });
});