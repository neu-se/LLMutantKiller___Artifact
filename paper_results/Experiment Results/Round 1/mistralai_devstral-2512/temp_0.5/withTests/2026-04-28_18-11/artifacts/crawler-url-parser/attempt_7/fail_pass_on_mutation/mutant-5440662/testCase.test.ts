import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with undefined path', () => {
  it('should handle path comparison when both paths are undefined', () => {
    const linkurl = "http://example.com";
    const pageurl = "http://example.com";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("samelevel");
  });
});