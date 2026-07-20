import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('gettype with default.htm in pageurl path', () => {
  it('should return uplevel when link is one level up from a page url ending in default.htm', () => {
    const result = gettype("http://example.com/aaa/bbb/", "http://example.com/aaa/bbb/ccc/default.htm");
    expect(result).toBe("uplevel");
  });
});