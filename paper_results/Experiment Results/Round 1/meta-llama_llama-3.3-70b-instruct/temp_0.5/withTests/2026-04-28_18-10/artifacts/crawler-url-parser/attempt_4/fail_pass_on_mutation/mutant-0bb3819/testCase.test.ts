import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "samelevel" for same level URLs with trailing slash and index.html', () => {
    const linkUrl = "http://sub.domain.com/aaa/bbb/";
    const pageUrl = "http://sub.domain.com/aaa/bbb/index.html";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});