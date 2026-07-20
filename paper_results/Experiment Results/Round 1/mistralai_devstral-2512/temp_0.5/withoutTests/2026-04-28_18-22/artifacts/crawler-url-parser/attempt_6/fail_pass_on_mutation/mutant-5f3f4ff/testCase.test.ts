import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'samelevel' when paths have same depth", () => {
    const pageUrl = "http://example.com/aaa/bbb/ccc";
    const linkUrl = "http://example.com/aaa/bbb/ddd";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});