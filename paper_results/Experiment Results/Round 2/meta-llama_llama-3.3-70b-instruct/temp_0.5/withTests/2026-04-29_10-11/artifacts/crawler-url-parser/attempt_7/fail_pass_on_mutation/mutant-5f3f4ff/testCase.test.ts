import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "sublevel" when part_count_diff is 1 and linkurl_path includes pageurl_path', () => {
    const linkurl = { host: 'sub.domain.com', path: '/aaa/bbb/ccc' };
    const pageurl = { host: 'sub.domain.com', path: '/aaa/bbb/' };
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('sublevel');
  });

  it('should return "uplevel" when part_count_diff is -1 and pageurl_path includes linkurl_path', () => {
    const linkurl = { host: 'sub.domain.com', path: '/aaa/bbb/' };
    const pageurl = { host: 'sub.domain.com', path: '/aaa/bbb/ccc' };
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('uplevel');
  });

  it.skip('should return "internal" when part_count_diff is 1 and linkurl_path does not include pageurl_path', () => {
    const linkurl = { host: 'sub.domain.com', path: '/aaa/ccc' };
    const pageurl = { host: 'sub.domain.com', path: '/aaa/bbb/' };
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('internal');
  });
});