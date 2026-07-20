import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "sublevel" when part_count_diff is 1 and then return "samelevel" when part_count_diff is 0', () => {
    const linkurl1 = { host: 'sub.domain.com', path: '/aaa/bbb/ccc' };
    const pageurl1 = { host: 'sub.domain.com', path: '/aaa/bbb/' };
    const result1 = gettype(linkurl1, pageurl1);
    expect(result1).toBe('sublevel');

    const linkurl2 = { host: 'sub.domain.com', path: '/aaa/bbb/ddd' };
    const pageurl2 = { host: 'sub.domain.com', path: '/aaa/bbb/ddd' };
    const result2 = gettype(linkurl2, pageurl2);
    expect(result2).toBe('samelevel');
  });
});