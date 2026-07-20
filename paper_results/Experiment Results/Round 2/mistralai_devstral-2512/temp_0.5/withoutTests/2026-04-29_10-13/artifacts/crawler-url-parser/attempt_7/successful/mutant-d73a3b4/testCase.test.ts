import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly handle paths with index.html in the middle of the path", () => {
    const linkUrl = "http://example.com/path/index.html/extra";
    const pageUrl = "http://example.com/path/";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("internal");
  });
});