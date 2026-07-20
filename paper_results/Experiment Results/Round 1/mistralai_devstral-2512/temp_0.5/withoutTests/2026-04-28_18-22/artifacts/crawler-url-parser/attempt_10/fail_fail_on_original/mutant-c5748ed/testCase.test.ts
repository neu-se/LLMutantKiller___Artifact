import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly handle index.html in middle of path for uplevel comparison", () => {
    const linkUrl = "http://example.com/aaa/index.html";
    const pageUrl = "http://example.com/aaa/index.html/bbb";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("uplevel");
  });
});