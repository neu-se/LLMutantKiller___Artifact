import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "internal" for internal URLs with index.html', () => {
    const linkUrl = "http://sub.domain.com/aaa/bbb/index.html";
    const pageUrl = "http://sub.domain.com/aaa/bbb/ccc/index.html";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("internal");
  });

  it('should return "internal" for internal URLs without index.html', () => {
    const linkUrl = "http://sub.domain.com/aaa/bbb/";
    const pageUrl = "http://sub.domain.com/aaa/bbb/ccc/";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("internal");
  });
});