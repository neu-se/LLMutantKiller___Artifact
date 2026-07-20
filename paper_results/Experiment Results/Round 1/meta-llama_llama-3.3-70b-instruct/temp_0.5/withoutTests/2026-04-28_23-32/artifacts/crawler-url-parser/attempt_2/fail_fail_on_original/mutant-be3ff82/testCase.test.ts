import { gettype } from "./crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly determine link type', () => {
    const linkurl = "http://example.com/index.abc/abc";
    const pageurl = "http://example.com/index.abc";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("sublevel");
  });
});