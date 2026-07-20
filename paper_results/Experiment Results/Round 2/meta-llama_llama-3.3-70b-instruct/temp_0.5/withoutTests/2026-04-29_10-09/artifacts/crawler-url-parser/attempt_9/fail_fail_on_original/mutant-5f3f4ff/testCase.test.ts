import { gettype } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('gettype function', () => {
  it('should return "uplevel" when part_count_diff is -1', () => {
    const linkurl = "http://example.com/aaa/bbb/ccc";
    const pageurl = "http://example.com/aaa/bbb";
    expect(gettype(linkurl, pageurl)).toBe("sublevel");
    expect(gettype(pageurl, linkurl)).toBe("uplevel");
    const linkurl2 = "http://example.com/aaa/bbb/ccc/ddd";
    const pageurl2 = "http://example.com/aaa/bbb/ccc";
    expect(gettype(linkurl2, pageurl2)).toBe("sublevel");
    expect(gettype(pageurl2, linkurl2)).not.toBe("uplevel");
  });
});