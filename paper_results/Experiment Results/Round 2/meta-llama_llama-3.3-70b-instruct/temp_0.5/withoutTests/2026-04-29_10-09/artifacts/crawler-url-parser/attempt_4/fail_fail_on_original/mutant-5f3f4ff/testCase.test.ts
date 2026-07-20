import { gettype } from '../../../crawler-url-parser.js';

describe('gettype function', () => {
  it('should return "uplevel" when part_count_diff is -1', () => {
    const linkurl = "http://example.com/aaa/bbb";
    const pageurl = "http://example.com/aaa/bbb/ccc";
    const originalResult = gettype(linkurl, pageurl);
    expect(originalResult).toBe("sublevel");
    const resultWithMutatedCode = gettype(pageurl, linkurl);
    expect(resultWithMutatedCode).not.toBe("uplevel");
  });
});