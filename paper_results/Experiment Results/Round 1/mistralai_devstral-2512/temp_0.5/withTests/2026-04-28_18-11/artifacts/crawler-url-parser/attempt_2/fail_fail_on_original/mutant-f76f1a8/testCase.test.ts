import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
  it('should correctly identify samelevel when pageurl path ends with default.xyz', () => {
    const linkUrl = "http://example.com/aaa/bbb/ccc";
    const pageUrl = "http://example.com/aaa/bbb/default.xyz";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});