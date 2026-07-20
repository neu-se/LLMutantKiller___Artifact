import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "sublevel" when part_count_diff is 1 and linkurl_path does not include pageurl_path', () => {
    const linkurl = { host: 'sub.domain.com', path: '/aaa/bbb/ccc/ddd' };
    const pageurl = { host: 'sub.domain.com', path: '/aaa/eee/' };
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('internal');
  });
});