import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly handle path comparison when pageUrl contains default.htm in subdirectory", () => {
    const linkUrl = "http://example.com/path/";
    const pageUrl = "http://example.com/path/subdir/default.htm";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("uplevel");
  });
});