import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly handle paths ending with index.html when comparing samelevel links", () => {
    const linkUrl = "http://example.com/aaa/bbb/";
    const pageUrl = "http://example.com/aaa/bbb/index.html";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});