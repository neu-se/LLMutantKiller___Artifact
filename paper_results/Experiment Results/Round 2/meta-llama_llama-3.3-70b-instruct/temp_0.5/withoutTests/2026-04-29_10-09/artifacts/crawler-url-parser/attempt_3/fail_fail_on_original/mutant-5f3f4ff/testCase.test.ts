import { gettype } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('gettype function', () => {
  it('should return "uplevel" when pageurl_path is a parent directory of linkurl_path and part_count_diff is -1', () => {
    const linkurl = "http://example.com/aaa/bbb/ccc";
    const pageurl = "http://example.com/aaa/bbb/ccc/ddd";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("uplevel");
  });
});