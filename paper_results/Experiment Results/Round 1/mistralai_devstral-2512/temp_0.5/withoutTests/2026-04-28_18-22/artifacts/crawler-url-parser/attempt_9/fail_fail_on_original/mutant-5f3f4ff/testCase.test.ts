import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'internal' when link path is one level deeper than page path", () => {
    const pageUrl = "http://example.com/aaa/bbb";
    const linkUrl = "http://example.com/aaa/bbb/ccc";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("internal");
  });
});