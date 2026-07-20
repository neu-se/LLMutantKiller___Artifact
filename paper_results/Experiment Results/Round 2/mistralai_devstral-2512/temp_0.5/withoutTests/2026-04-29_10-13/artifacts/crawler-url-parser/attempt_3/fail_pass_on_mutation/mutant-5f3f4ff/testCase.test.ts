import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'internal' when link path is two levels deeper than page path", () => {
    const linkUrl = "http://example.com/aaa/bbb/ccc";
    const pageUrl = "http://example.com/aaa";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("internal");
  });
});