import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify samelevel links when pageurl_path contains index.html in the middle", () => {
    const linkUrl = "http://example.com/aaa/index.html/bbb/";
    const pageUrl = "http://example.com/aaa/index.html/bbb/ccc";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});