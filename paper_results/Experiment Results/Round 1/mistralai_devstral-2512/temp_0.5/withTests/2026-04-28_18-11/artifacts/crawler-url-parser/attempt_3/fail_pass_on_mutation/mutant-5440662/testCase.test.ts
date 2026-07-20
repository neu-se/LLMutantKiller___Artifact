import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with undefined path', () => {
  it('should return "uplevel" when linkurl path is undefined and pageurl has path', () => {
    const linkurl = "http://example.com";
    const pageurl = "http://example.com/path";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("uplevel");
  });
});