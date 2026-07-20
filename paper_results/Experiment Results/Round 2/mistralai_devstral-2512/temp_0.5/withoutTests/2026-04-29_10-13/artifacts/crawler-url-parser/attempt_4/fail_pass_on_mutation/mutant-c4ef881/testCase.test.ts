import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'internal' when paths have different lengths and don't match samelevel condition", () => {
    const linkUrl = "http://example.com/aaa/bbb/ccc";
    const pageUrl = "http://example.com/aaa/bbb/ddd/eee";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("internal");
  });
});