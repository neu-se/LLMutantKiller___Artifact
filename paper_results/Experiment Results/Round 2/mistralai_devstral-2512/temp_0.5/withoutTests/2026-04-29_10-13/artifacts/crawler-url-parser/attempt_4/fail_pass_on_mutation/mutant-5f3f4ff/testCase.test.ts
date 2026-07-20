import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'samelevel' when link path is at same level as page path", () => {
    const linkUrl = "http://example.com/aaa/bbb";
    const pageUrl = "http://example.com/aaa/ccc";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});