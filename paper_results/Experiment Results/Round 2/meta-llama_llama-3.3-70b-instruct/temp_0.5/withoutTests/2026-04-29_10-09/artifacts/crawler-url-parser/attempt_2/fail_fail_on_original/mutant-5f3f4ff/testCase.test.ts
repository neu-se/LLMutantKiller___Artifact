import { gettype } from '../crawler-url-parser.js';

describe('gettype function', () => {
  it('should return "uplevel" when pageurl_path is a parent directory of linkurl_path', () => {
    const linkurl = "http://example.com/aaa/bbb/ccc";
    const pageurl = "http://example.com/aaa/bbb";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("sublevel");
  });
});