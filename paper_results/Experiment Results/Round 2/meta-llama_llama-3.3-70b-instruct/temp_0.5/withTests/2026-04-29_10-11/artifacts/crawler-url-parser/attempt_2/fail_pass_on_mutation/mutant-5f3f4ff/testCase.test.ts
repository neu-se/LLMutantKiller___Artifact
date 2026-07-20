import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "sublevel" when part_count_diff is 1', () => {
    const linkurl = { host: 'sub.domain.com', path: '/aaa/bbb/ccc' };
    const pageurl = { host: 'sub.domain.com', path: '/aaa/bbb/' };
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('sublevel');
  });

  it('should not always return "samelevel"', () => {
    const linkurl = { host: 'sub.domain.com', path: '/aaa/bbb/ccc' };
    const pageurl = { host: 'sub.domain.com', path: '/aaa/bbb/' };
    const result = gettype(linkurl, pageurl);
    expect(result).not.toBe('samelevel');
  });
});