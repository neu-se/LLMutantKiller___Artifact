import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'uplevel' when link path is one level up from page path with trailing slash", () => {
    const linkUrl = "http://example.com/aaa/";
    const pageUrl = "http://example.com/aaa/bbb/";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("uplevel");
  });
});