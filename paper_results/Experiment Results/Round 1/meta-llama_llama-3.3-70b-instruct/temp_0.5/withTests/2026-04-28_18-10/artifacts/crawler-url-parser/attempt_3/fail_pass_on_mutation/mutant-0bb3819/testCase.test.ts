import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "samelevel" for same level URLs with default page', () => {
    const linkUrl = "http://sub.domain.com/aaa/bbb/index.html";
    const pageUrl = "http://sub.domain.com/aaa/bbb/default.html";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });

  it('should return "samelevel" for same level URLs without default page', () => {
    const linkUrl = "http://sub.domain.com/aaa/bbb/";
    const pageUrl = "http://sub.domain.com/aaa/bbb/";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});