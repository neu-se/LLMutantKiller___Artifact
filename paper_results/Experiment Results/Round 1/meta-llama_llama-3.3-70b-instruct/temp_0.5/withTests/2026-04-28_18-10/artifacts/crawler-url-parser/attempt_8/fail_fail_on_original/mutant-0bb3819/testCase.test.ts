import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return correct type for URLs with index.html and default.html removed', () => {
    const linkUrl = "http://sub.domain.com/aaa/bbb/index.html";
    const pageUrl = "http://sub.domain.com/aaa/bbb/default.html";
    linkUrl = linkUrl.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
    pageUrl = pageUrl.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});