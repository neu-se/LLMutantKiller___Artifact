import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return correct type', () => {
    const linkurl = { url: 'http://sub.domain.com/aaa/bbb/ccc', path: '/aaa/bbb/ccc' };
    const pageurl = { url: 'http://sub.domain.com/aaa/bbb/', path: '/aaa/bbb/' };
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('sublevel');
  });

  it('should fail on mutated code', () => {
    const linkurl = { url: 'http://sub.domain.com/aaa/bbb/ccc', path: '/aaa/bbb/ccc' };
    const pageurl = { url: 'http://sub.domain.com/aaa/bbb/Stryker was here!', path: 'Stryker was here!' };
    const result = gettype(linkurl, pageurl);
    expect(result).not.toBe('sublevel');
  });
});