import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return different results for part_count_diff of 1 and -1', () => {
    const linkurl1 = { host: 'sub.domain.com', path: '/aaa/bbb/ccc' };
    const pageurl1 = { host: 'sub.domain.com', path: '/aaa/bbb/' };
    const result1 = gettype(linkurl1, pageurl1);

    const linkurl2 = { host: 'sub.domain.com', path: '/aaa/bbb/' };
    const pageurl2 = { host: 'sub.domain.com', path: '/aaa/bbb/ccc' };
    const result2 = gettype(linkurl2, pageurl2);

    expect(result1).not.toBe(result2);
  });
});