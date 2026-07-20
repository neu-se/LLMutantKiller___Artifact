import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with undefined path', () => {
  it('should handle path comparison when pageurl path is undefined and linkurl path is defined', () => {
    const linkurl = "http://example.com/path/to/link";
    const pageurl = "http://example.com";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("sublevel");
  });
});