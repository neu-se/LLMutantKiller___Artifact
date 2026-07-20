import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with index page normalization", () => {
  it("should return 'uplevel' when link is parent path and page is index file in subdirectory", () => {
    const linkUrl = "http://www.example.com/aaa/bbb/";
    const pageUrl = "http://www.example.com/aaa/bbb/ccc/index.html";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("uplevel");
  });
});