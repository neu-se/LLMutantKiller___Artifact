import { gettype } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly determine link type', () => {
    const linkurl = "http://example.com/index.123/abc";
    const pageurl = "http://example.com/index.123";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("internal");
  });
});