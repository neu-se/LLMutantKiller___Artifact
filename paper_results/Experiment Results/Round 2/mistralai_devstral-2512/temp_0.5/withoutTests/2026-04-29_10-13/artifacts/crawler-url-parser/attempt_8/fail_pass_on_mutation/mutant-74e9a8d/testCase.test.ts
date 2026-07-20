import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'uplevel' when comparing path with parent directory containing default.htm", () => {
    const linkUrl = "http://example.com/path/";
    const pageUrl = "http://example.com/path/subdir/default.htm";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("uplevel");
  });
});