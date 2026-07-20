import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "sublevel" when part_count_diff is 1 and linkurl_path includes pageurl_path and linkurl_without_last_part equals pageurl_path', () => {
    const linkurl = { host: 'sub.domain.com', path: '/aaa/bbb/ccc' };
    const pageurl = { host: 'sub.domain.com', path: '/aaa/bbb/' };
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('sublevel');
  });
});