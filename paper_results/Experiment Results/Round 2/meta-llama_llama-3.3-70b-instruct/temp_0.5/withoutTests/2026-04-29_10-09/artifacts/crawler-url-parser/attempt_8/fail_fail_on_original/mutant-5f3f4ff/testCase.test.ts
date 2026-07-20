import { gettype } from './crawler-url-parser';

describe('gettype function', () => {
  it('should return "internal" when part_count_diff is not -1 or 1', () => {
    const linkurl = "http://example.com/aaa/bbb/ccc";
    const pageurl = "http://example.com/aaa/bbb/ccc";
    expect(gettype(linkurl, pageurl)).toBe("samelevel");
    const linkurl2 = "http://example.com/aaa/bbb/ddd";
    expect(gettype(linkurl2, pageurl)).toBe("internal");
  });
});