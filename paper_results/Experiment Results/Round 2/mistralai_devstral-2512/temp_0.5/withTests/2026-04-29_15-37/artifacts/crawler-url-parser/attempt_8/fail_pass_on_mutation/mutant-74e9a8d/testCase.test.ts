import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
  it('should correctly handle default.html path normalization in uplevel detection', () => {
    const linkUrl = "http://example.com/aaa";
    const pageUrl = "http://example.com/aaa/bbb/default.html";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("uplevel");
  });
});