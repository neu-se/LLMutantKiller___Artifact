import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function with index.html path handling", () => {
  it("should correctly handle paths ending with index.html when comparing with parent path", () => {
    const linkUrl = "http://example.com/aaa/bbb/index.html";
    const pageUrl = "http://example.com/aaa/bbb";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});