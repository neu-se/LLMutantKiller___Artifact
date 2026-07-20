import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'sublevel' when link path is one level deeper than page path", () => {
    const linkUrl = "http://example.com/aaa/bbb";
    const pageUrl = "http://example.com/aaa";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("sublevel");
  });
});