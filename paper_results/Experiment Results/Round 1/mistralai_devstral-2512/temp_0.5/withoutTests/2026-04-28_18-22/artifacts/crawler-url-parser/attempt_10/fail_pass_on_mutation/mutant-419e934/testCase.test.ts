import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly handle path comparison when page ends with index.html and link is in parent directory", () => {
    const pageUrl = "http://example.com/path/sub/index.html";
    const linkUrl = "http://example.com/path/";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("uplevel");
  });
});