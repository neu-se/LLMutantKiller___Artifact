import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function with index.html path handling", () => {
  it("should correctly handle paths with index.html in the middle followed by more segments", () => {
    const linkUrl = "http://example.com/aaa/index.html/bbb/ccc";
    const pageUrl = "http://example.com/aaa/bbb/ccc";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});