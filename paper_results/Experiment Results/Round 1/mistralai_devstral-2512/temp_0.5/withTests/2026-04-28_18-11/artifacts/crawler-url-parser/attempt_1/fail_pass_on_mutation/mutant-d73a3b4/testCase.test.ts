import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function with index.html path handling", () => {
  it("should correctly identify samelevel relationship when linkurl path contains 'index.html'", () => {
    const linkUrl = "http://example.com/aaa/bbb/index.html";
    const pageUrl = "http://example.com/aaa/bbb/ccc";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("uplevel");
  });
});