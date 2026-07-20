import { gettype } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('gettype function', () => {
  it('should return "uplevel" when part_count_diff is -1', () => {
    const linkurl = "http://example.com/aaa/bbb/ccc";
    const pageurl = "http://example.com/aaa/bbb";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("sublevel");
    const result2 = gettype(pageurl, linkurl);
    expect(result2).toBe("uplevel");
  });
});