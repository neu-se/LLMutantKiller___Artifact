import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "uplevel" when part_count_diff is -1', () => {
    const linkurl = { host: 'sub.domain.com', path: '/aaa/bbb/' };
    const pageurl = { host: 'sub.domain.com', path: '/aaa/bbb/ccc' };
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('uplevel');
  });
});