import { gettype } from '../crawler-url-parser.js';

describe('gettype function', () => {
  it('should return "uplevel" when part_count_diff is -1', () => {
    const linkurl = "http://example.com/aaa/bbb/ccc";
    const pageurl = "http://example.com/aaa/bbb/ccc/ddd";
    expect(gettype(linkurl, pageurl)).toBe("sublevel");
    expect(gettype(pageurl, linkurl)).toBe("uplevel");
  });
});